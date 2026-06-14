import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "30px" }}>
      <h1>SplitWise Dashboard</h1>

      <button onClick={() => navigate("/groups")}>
        Create Group
      </button>

      <br />
      <br />

      <button onClick={() => navigate("/import")}>
        Import CSV
      </button>

      <br />
      <br />

      <button onClick={() => navigate("/balances")}>
        Balances
      </button>

      <br />
      <br />

      <button onClick={() => navigate("/settlements")}>
        Settlements
      </button>

      <br />
      <br />

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}