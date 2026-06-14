import { useState } from "react";
import api from "../api/api";

export default function Groups() {
  const [name, setName] = useState("");

  const createGroup = async () => {
    try {
      const res = await api.post("/groups", {
        name,
      });

      console.log(res.data);

      alert("Group Created");

      setName("");
    } catch (err) {
      console.error(err);

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