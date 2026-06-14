import { useState } from "react";
import api from "../api/api";

export default function Settlements() {
  const [groupId, setGroupId] = useState(
    localStorage.getItem("groupId") || ""
  );

  const [settlements, setSettlements] =
    useState<any[]>([]);

  const loadSettlements = async () => {
    try {
      const res = await api.get(
        `/groups/${groupId}/settlements`
      );

      setSettlements(
        res.data.settlements
      );
    } catch (error) {
      console.error(error);
      alert("Failed to load settlements");
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

      <input
        placeholder="Group Id"
        value={groupId}
        onChange={(e) =>
          setGroupId(e.target.value)
        }
      />

      <button onClick={loadSettlements}>
        Generate
      </button>

      <pre>
        {JSON.stringify(
          settlements,
          null,
          2
        )}
      </pre>
    </div>
  );
}