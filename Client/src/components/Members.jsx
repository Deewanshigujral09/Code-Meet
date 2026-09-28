import { useEffect, useState } from "react";
import { Users, Shield, User } from "lucide-react";
import { getWorkspaceMembers } from "../services/memberApi";

const Members = ({ workspaceId, token }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await getWorkspaceMembers(workspaceId, token);
        setMembers(data);
      } catch (error) {
        console.error("Failed to load members:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, [workspaceId, token]);

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "8px",
          }}
        >
          <Users size={24} color="#818cf8" />
          <h1 style={{ margin: 0, fontSize: "24px" }}>
            Workspace Members
          </h1>
        </div>

        <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
          Manage people who are part of this workspace.
        </p>
      </div>

      {loading ? (
        <p style={{ color: "#94a3b8" }}>Loading members...</p>
      ) : members.length === 0 ? (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            background: "#111827",
            border: "1px solid #1f2937",
            borderRadius: "12px",
            color: "#94a3b8",
          }}
        >
          No members found.
        </div>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {members.map((member) => (
            <div
              key={member.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px",
                background: "#111827",
                border: "1px solid #1f2937",
                borderRadius: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "#312e81",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <User size={20} />
                </div>

                <div>
                  <div
                    style={{
                      color: "#e2e8f0",
                      fontWeight: "600",
                    }}
                  >
                    User #{member.userId}
                  </div>

                  <div
                    style={{
                      color: "#64748b",
                      fontSize: "12px",
                    }}
                  >
                    Member ID: {member.id}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 10px",
                  borderRadius: "999px",
                  background:
                    member.role === "OWNER"
                      ? "#312e81"
                      : "#1e293b",
                  color:
                    member.role === "OWNER"
                      ? "#a5b4fc"
                      : "#cbd5e1",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {member.role === "OWNER" && <Shield size={13} />}
                {member.role}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Members;