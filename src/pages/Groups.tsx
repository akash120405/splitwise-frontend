import { useEffect, useState } from "react";
import api from "../api/api";

interface Member {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function Groups() {
  const [groupName, setGroupName] =
    useState("");

  const [groupId, setGroupId] =
    useState(
      localStorage.getItem("groupId") || ""
    );

  const [memberName, setMemberName] =
    useState("");

  const [memberEmail, setMemberEmail] =
    useState("");

  const [members, setMembers] =
    useState<Member[]>([]);

  const [message, setMessage] =
    useState("");

  const fetchMembers =
    async () => {
      if (!groupId) return;

      try {
        const res =
          await api.get(
            `/groups/${groupId}/members`
          );

        setMembers(
          res.data.members
        );
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    fetchMembers();
  }, [groupId]);

  const createGroup =
    async () => {
      try {
        const res =
          await api.post(
            "/groups",
            {
              name: groupName,
            }
          );

        const newGroupId =
          res.data.group.id;

        localStorage.setItem(
          "groupId",
          newGroupId
        );

        setGroupId(
          newGroupId
        );

        setMessage(
          "✅ Group created successfully"
        );

        setGroupName("");
      } catch (error) {
        console.error(error);

        setMessage(
          "❌ Failed to create group"
        );
      }
    };

  const addMember =
    async () => {
      if (
        !memberName ||
        !memberEmail
      ) {
        setMessage(
          "❌ Name and Email required"
        );

        return;
      }

      try {
        await api.post(
          `/groups/${groupId}/members`,
          {
            name: memberName,
            email: memberEmail,
          }
        );

        setMessage(
          "✅ Member added successfully"
        );

        setMemberName("");
        setMemberEmail("");

        fetchMembers();
      } catch (error) {
        console.error(error);

        setMessage(
          "❌ Failed to add member"
        );
      }
    };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        SplitWise Groups
      </h1>

      {message && (
        <div
          style={{
            background: "#1e293b",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          {message}
        </div>
      )}

      {/* CREATE GROUP */}

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <h2>Create Group</h2>

        <input
          placeholder="Group Name"
          value={groupName}
          onChange={(e) =>
            setGroupName(
              e.target.value
            )
          }
          style={{
            width: "70%",
            padding: "10px",
            marginRight: "10px",
          }}
        />

        <button
          onClick={
            createGroup
          }
          style={{
            padding:
              "10px 20px",
            cursor: "pointer",
          }}
        >
          Create
        </button>
      </div>

      {/* CURRENT GROUP */}

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <h2>Current Group</h2>

        <p>
          <strong>
            Group ID:
          </strong>{" "}
          {groupId ||
            "No group selected"}
        </p>
      </div>

      {/* MEMBERS */}

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <h2>
          Group Members
        </h2>

        {members.length ===
        0 ? (
          <p>
            No members yet
          </p>
        ) : (
          members.map(
            (member) => (
              <div
                key={
                  member.id
                }
                style={{
                  padding:
                    "10px",
                  marginBottom:
                    "10px",
                  border:
                    "1px solid #334155",
                  borderRadius:
                    "8px",
                }}
              >
                <div>
                  👤{" "}
                  <strong>
                    {
                      member
                        .user
                        .name
                    }
                  </strong>
                </div>

                <div>
                  {
                    member
                      .user
                      .email
                  }
                </div>
              </div>
            )
          )
        )}
      </div>

      {/* ADD MEMBER */}

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h2>Add Member</h2>

        <input
          placeholder="Name"
          value={memberName}
          onChange={(e) =>
            setMemberName(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom:
              "10px",
          }}
        />

        <input
          placeholder="Email"
          value={memberEmail}
          onChange={(e) =>
            setMemberEmail(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom:
              "10px",
          }}
        />

        <button
          onClick={
            addMember
          }
          style={{
            padding:
              "10px 20px",
            cursor: "pointer",
          }}
        >
          Add Member
        </button>
      </div>
    </div>
  );
}