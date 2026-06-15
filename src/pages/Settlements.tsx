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

  const buttonStyle = {
    padding: "15px 25px",
    fontSize: "16px",
    fontWeight: "bold" as const,
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    background: "#2563eb",
    color: "white",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #1e3a8a, #2563eb)",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "white",
          borderRadius: "20px",
          padding: "40px",
          boxShadow:
            "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
            marginBottom: "30px",
            fontSize: "36px",
          }}
        >
          🤝 Settlements
        </h1>

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <button
            style={buttonStyle}
            onClick={generateSettlements}
          >
            Generate Settlements
          </button>
        </div>

        {settlements.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#64748b",
              fontSize: "18px",
            }}
          >
            No settlements generated yet.
          </div>
        ) : (
          settlements.map((s) => (
            <div
              key={s.id}
              style={{
                padding: "20px",
                borderRadius: "14px",
                background: "#f8fafc",
                border:
                  "1px solid #e2e8f0",
                marginBottom: "15px",
                fontSize: "18px",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <strong
                style={{
                  color: "#2563eb",
                }}
              >
                {s.payer.name}
              </strong>

              {" pays "}

              <strong
                style={{
                  color: "#16a34a",
                }}
              >
                {s.receiver.name}
              </strong>

              {" ₹"}

              <strong>
                {s.amount}
              </strong>
            </div>
          ))
        )}
      </div>
    </div>
  );
}