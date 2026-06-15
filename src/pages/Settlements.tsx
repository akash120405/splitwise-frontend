import { useState } from "react";
import api from "../api/api";

export default function Settlements() {
  const [settlements, setSettlements] =
    useState<any[]>([]);

  const groupId =
    localStorage.getItem("groupId") || "";

  const generateSettlements = async () => {
    try {
      await api.post(
        `/settlements/${groupId}`
      );

      const res = await api.get(
        "/settlements"
      );

      setSettlements(
        res.data.settlements
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
      <h1>Settlements</h1>

      <button
        onClick={generateSettlements}
      >
        Generate Settlements
      </button>

      <hr />

      {settlements.map((s) => (
        <div
          key={s.id}
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            marginBottom: "10px",
          }}
        >
          <strong>
            {s.payer.name}
          </strong>

          {" pays "}

          <strong>
            {s.receiver.name}
          </strong>

          {" ₹"}

          {s.amount}
        </div>
      ))}
    </div>
  );
}