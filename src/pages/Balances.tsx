import { useState } from "react";
import api from "../api/api";

export default function Balances() {
  const [balances, setBalances] =
    useState<any[]>([]);

  const groupId =
    localStorage.getItem("groupId") || "";

  const loadBalances = async () => {
    try {
      const res = await api.get(
        `/groups/${groupId}/balances`
      );

      setBalances(
        res.data.participants || []
      );
    } catch (error) {
      console.error(error);
      alert("Failed");
    }
  };

  return (
    <div
      style={{
        width: "700px",
        margin: "50px auto",
      }}
    >
      <h1>Balances</h1>

      <button onClick={loadBalances}>
        Load Balances
      </button>

      <hr />

      {balances.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h3>
            {item.expense.title}
          </h3>

          <p>
            User:
            {" "}
            {item.userId}
          </p>

          <p>
            Owes:
            {" "}
            ₹{item.owedAmount}
          </p>
        </div>
      ))}
    </div>
  );
}