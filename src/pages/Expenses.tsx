import { useEffect, useState } from "react";
import api from "../api/api";

export default function Expenses() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [groupId, setGroupId] = useState("");

  const [splitType, setSplitType] =
    useState("EQUAL");

  const [members, setMembers] =
    useState<any[]>([]);

  const [paidById, setPaidById] =
    useState("");

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
      loadMembers(storedGroupId);
    }
  }, []);

  const loadMembers = async (
    currentGroupId: string
  ) => {
    try {
      const res = await api.get(
        `/groups/${currentGroupId}/members`
      );

      setMembers(res.data.members);

      if (
        res.data.members &&
        res.data.members.length > 0
      ) {
        setPaidById(
          res.data.members[0].user.id
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      const payload: any = {
        title,
        amount: Number(amount),
        groupId,
        paidById,
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
                amount: Number(
                  p.value
                ),
              };
            }

            if (
              splitType ===
              "PERCENTAGE"
            ) {
              return {
                userId: p.userId,
                percentage:
                  Number(
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

      setParticipants([
        {
          userId: "",
          value: "",
        },
      ]);
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
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        background: "#16213e",
        borderRadius: "15px",
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Create Expense
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          placeholder="Expense Title"
          style={{
            padding: "12px",
          }}
        />

        <input
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
          placeholder="Amount"
          style={{
            padding: "12px",
          }}
        />

        <label>
          Paid By
        </label>

        <select
          value={paidById}
          onChange={(e) =>
            setPaidById(
              e.target.value
            )
          }
          style={{
            padding: "12px",
          }}
        >
          {members.map(
            (member) => (
              <option
                key={
                  member.user.id
                }
                value={
                  member.user.id
                }
              >
                {
                  member.user
                    .name
                }
              </option>
            )
          )}
        </select>

        <label>
          Split Type
        </label>

        <select
          value={splitType}
          onChange={(e) =>
            setSplitType(
              e.target.value
            )
          }
          style={{
            padding: "12px",
          }}
        >
          <option value="EQUAL">
            Equal
          </option>

          <option value="UNEQUAL">
            Unequal
          </option>

          <option value="PERCENTAGE">
            Percentage
          </option>

          <option value="SHARE">
            Share
          </option>
        </select>
      </div>

      {splitType !== "EQUAL" && (
        <>
          <h2
            style={{
              marginTop: "30px",
            }}
          >
            Participants
          </h2>

          {participants.map(
            (
              participant,
              index
            ) => (
              <div
                key={index}
                style={{
                  display:
                    "flex",
                  gap: "10px",
                  marginBottom:
                    "15px",
                }}
              >
                <select
                  value={
                    participant.userId
                  }
                  onChange={(
                    e
                  ) =>
                    updateParticipant(
                      index,
                      "userId",
                      e.target
                        .value
                    )
                  }
                  style={{
                    flex: 1,
                    padding:
                      "10px",
                  }}
                >
                  <option value="">
                    Select Member
                  </option>

                  {members.map(
                    (
                      member
                    ) => (
                      <option
                        key={
                          member
                            .user
                            .id
                        }
                        value={
                          member
                            .user
                            .id
                        }
                      >
                        {
                          member
                            .user
                            .name
                        }
                      </option>
                    )
                  )}
                </select>

                <input
                  style={{
                    flex: 1,
                    padding:
                      "10px",
                  }}
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
                  onChange={(
                    e
                  ) =>
                    updateParticipant(
                      index,
                      "value",
                      e.target
                        .value
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
            style={{
              padding:
                "10px 20px",
              marginTop:
                "10px",
            }}
          >
            Add Participant
          </button>
        </>
      )}

      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        <button
          onClick={
            createExpense
          }
          style={{
            padding:
              "12px 30px",
            fontSize:
              "16px",
            background:
              "#4CAF50",
            color:
              "white",
            border:
              "none",
            borderRadius:
              "8px",
            cursor:
              "pointer",
          }}
        >
          Create Expense
        </button>
      </div>
    </div>
  );
}