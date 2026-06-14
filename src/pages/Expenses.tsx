import { useState } from "react";
import api from "../api/api";

export default function Expenses() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const [groupId, setGroupId] = useState(
    localStorage.getItem("groupId") || ""
  );

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

  const inputStyle = {
    width: "350px",
    padding: "10px",
    backgroundColor: "#222",
    color: "white",
    border: "1px solid #555",
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "50px auto",
      }}
    >
      <h1>Create Expense</h1>

      <input
        style={inputStyle}
        placeholder="Group Id"
        value={groupId}
        onChange={(e) =>
          setGroupId(e.target.value)
        }
      />

      <br />
      <br />

      <input
        style={inputStyle}
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br />
      <br />

      <input
        style={inputStyle}
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
      />

      <br />
      <br />

      <button
        onClick={createExpense}
      >
        Create Expense
      </button>
    </div>
  );
}