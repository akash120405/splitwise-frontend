// src/pages/Balances.tsx

import { useState } from "react";
import api from "../api/api";

export default function Balances() {
  const [groupId, setGroupId] = useState("");
  const [balances, setBalances] = useState<any[]>([]);

  const loadBalances = async () => {
    try {
      const res = await api.get(
        `/groups/${groupId}/balances`
      );

      setBalances(res.data.balances);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ width: "600px", margin: "50px auto" }}>
      <h1>Balances</h1>

      <input
        placeholder="Group Id"
        value={groupId}
        onChange={(e) => setGroupId(e.target.value)}
      />

      <button onClick={loadBalances}>
        Load
      </button>

      <pre>
        {JSON.stringify(
          balances,
          null,
          2
        )}
      </pre>
    </div>
  );
}