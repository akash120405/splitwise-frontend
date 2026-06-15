import { useState } from "react";
import api from "../api/api";

export default function Groups() {
  const [name, setName] =
    useState("");

  const [groupId, setGroupId] =
    useState(
      localStorage.getItem(
        "groupId"
      ) || ""
    );

  const [userId, setUserId] =
    useState("");

  const createGroup =
    async () => {
      try {
        const res =
          await api.post(
            "/groups",
            {
              name,
            }
          );

        localStorage.setItem(
          "groupId",
          res.data.group.id
        );

        setGroupId(
          res.data.group.id
        );

        alert(
          "Group Created"
        );
      } catch (error) {
        console.error(error);
        alert(
          "Failed to create group"
        );
      }
    };

  const addMember =
    async () => {
      try {
        await api.post(
          `/groups/${groupId}/members`,
          {
            userId,
          }
        );

        alert(
          "Member Added"
        );

        setUserId("");
      } catch (error) {
        console.error(error);
        alert(
          "Failed to add member"
        );
      }
    };

  return (
    <div
      style={{
        width: "600px",
        margin: "50px auto",
      }}
    >
      <h1>Groups</h1>

      <h2>
        Create Group
      </h2>

      <input
        placeholder="Group Name"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
      />

      <button
        onClick={
          createGroup
        }
      >
        Create
      </button>

      <hr />

      <h2>
        Current Group
      </h2>

      <p>
        Group ID:
        {" "}
        {groupId}
      </p>

      <hr />

      <h2>
        Add Member
      </h2>

      <input
        placeholder="User Id"
        value={userId}
        onChange={(e) =>
          setUserId(
            e.target.value
          )
        }
      />

      <button
        onClick={addMember}
      >
        Add Member
      </button>
    </div>
  );
}