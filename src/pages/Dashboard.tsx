import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const buttonStyle = {
    width: "250px",
    padding: "15px",
    fontSize: "18px",
    fontWeight: "bold" as const,
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    background: "#2563eb",
    color: "white",
    marginBottom: "15px",
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "50px auto",
        textAlign: "center",
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          marginBottom: "40px",
        }}
      >
        💰 SplitWise Dashboard
      </h1>

      <button
        style={buttonStyle}
        onClick={() => navigate("/groups")}
      >
        👥 Groups
      </button>

      <br />

      <button
        style={buttonStyle}
        onClick={() => navigate("/expenses")}
      >
        💸 Expenses
      </button>

      <br />

      <button
        style={buttonStyle}
        onClick={() => navigate("/history")}
      >
        📜 Expense History
      </button>

      <br />

      <button
        style={buttonStyle}
        onClick={() => navigate("/balances")}
      >
        📊 Balances
      </button>

      <br />

      <button
        style={buttonStyle}
        onClick={() => navigate("/settlements")}
      >
        🤝 Settlements
      </button>

      <br />

      <button
        style={buttonStyle}
        onClick={() => navigate("/import")}
      >
        📂 Import CSV
      </button>
    </div>
  );
}