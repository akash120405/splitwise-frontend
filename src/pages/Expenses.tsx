import { useEffect, useState } from "react";
import api from "../api/api";

export default function Expenses() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [groupId, setGroupId] = useState("");
  const [splitType, setSplitType] =
    useState("EQUAL");

  const [participants, setParticipants] =
    useState([
      {
        userId: "",
        value: "",
      },
    ]);

  useEffect(() => {
    const storedGroupId =
      localStorage.getItem("groupId");

    if (storedGroupId) {
      setGroupId(storedGroupId);
    }
  }, []);

  const addParticipant = () => {
    setParticipants([
      ...participants,
      {
        userId: "",
        value: "",
      },
    ]);
  };

  const updateParticipant = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...participants];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setParticipants(updated);
  };

  const createExpense = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      let payload: any = {
        title,
        amount: Number(amount),
        groupId,
        paidById: user.id,
        splitType,
      };

      if (splitType !== "EQUAL") {
        payload.participants =
          participants.map((p) => {
            if (
              splitType === "UNEQUAL"
            ) {
              return {
                userId: p.userId,
                amount: Number(p.value),
              };
            }

            if (
              splitType === "PERCENTAGE"
            ) {
              return {
                userId: p.userId,
                percentage: Number(
                  p.value
                ),
              };
            }

            return {
              userId: p.userId,
              shares: Number(
                p.value
              ),
            };
          });
      }

      await api.post(
        "/expenses",
        payload
      );

      alert(
        "Expense Created Successfully"
      );

      setTitle("");
      setAmount("");
    } catch (error) {
      console.error(error);
      alert(
        "Failed to create expense"
      );
    }
  };

  return (
    <div
      style={{
        width: "600px",
        margin: "50px auto",
      }}
    >
      <h1>Create Expense</h1>

      <input
        value={groupId}
        onChange={(e) =>
          setGroupId(e.target.value)
        }
        placeholder="Group Id"
      />

      <br />
      <br />

      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="Title"
      />

      <br />
      <br />

      <input
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
        placeholder="Amount"
      />

      <br />
      <br />

      <select
        value={splitType}
        onChange={(e) =>
          setSplitType(
            e.target.value
          )
        }
      >
        <option value="EQUAL">
          EQUAL
        </option>

        <option value="UNEQUAL">
          UNEQUAL
        </option>

        <option value="PERCENTAGE">
          PERCENTAGE
        </option>

        <option value="SHARE">
          SHARE
        </option>
      </select>

      <br />
      <br />

      {splitType !== "EQUAL" && (
        <>
          <h3>
            Participants
          </h3>

          {participants.map(
            (
              participant,
              index
            ) => (
              <div
                key={index}
                style={{
                  marginBottom:
                    "10px",
                }}
              >
                <input
                  placeholder="User Id"
                  value={
                    participant.userId
                  }
                  onChange={(e) =>
                    updateParticipant(
                      index,
                      "userId",
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder={
                    splitType ===
                    "UNEQUAL"
                      ? "Amount"
                      : splitType ===
                        "PERCENTAGE"
                      ? "Percentage"
                      : "Shares"
                  }
                  value={
                    participant.value
                  }
                  onChange={(e) =>
                    updateParticipant(
                      index,
                      "value",
                      e.target.value
                    )
                  }
                />
              </div>
            )
          )}

          <button
            onClick={
              addParticipant
            }
          >
            Add Participant
          </button>

          <br />
          <br />
        </>
      )}

      <button
        onClick={createExpense}
      >
        Create Expense
      </button>
    </div>
  );
}