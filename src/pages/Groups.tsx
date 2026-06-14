import { useState } from "react";
import api from "../api/api";

export default function Groups() {
  const [name, setName] = useState("");

  const createGroup = async () => {
    try {
      const res = await api.post("/groups", {
        name,
      });

      localStorage.setItem(
        "groupId",
        res.data.group.id
      );

      alert("Group Created");
    } catch (error) {
      console.error(error);
      alert("Failed to create group");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Group</h1>

      <input
        placeholder="Group Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={createGroup}>
        Create Group
      </button>
    </div>
  );
}