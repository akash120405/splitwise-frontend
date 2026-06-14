import { useState } from "react";
import api from "../api/api";

export default function Expenses() {
  const savedGroupId =
    localStorage.getItem("groupId") || "";

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [groupId, setGroupId] =
    useState(savedGroupId);

  const createExpense = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      await api.post("/expenses", {
        title,
        amount: Number(amount),
        groupId,
        paidById: user.id,
        splitType: "EQUAL",
      });

      alert("Expense Created");
    } catch (error) {
      console.error(error);
      alert("Failed");
    }
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "50px auto",
      }}
    >
      <h1>Create Expense</h1>

      <p>
        Stored Group ID:
        <br />
        <b>{savedGroupId}</b>
      </p>

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

      <button onClick={createExpense}>
        Create Expense
      </button>
    </div>
  );
}