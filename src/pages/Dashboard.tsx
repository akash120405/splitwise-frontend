import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard</h1>

      <button onClick={() => navigate("/groups")}>
        Groups
      </button>

      <br /><br />

      <button onClick={() => navigate("/expenses")}>
        Expenses
      </button>

      <br /><br />

      <button onClick={() => navigate("/import")}>
        Import CSV
      </button>

      <br /><br />

      <button onClick={() => navigate("/balances")}>
        Balances
      </button>

      <br /><br />

      <button onClick={() => navigate("/settlements")}>
        Settlements
      </button>
    </div>
  );
}