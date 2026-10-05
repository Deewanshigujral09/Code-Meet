import { useEffect, useState } from "react";
import { Search, Bell, ChevronDown, LogOut, FolderKanban } from "lucide-react";
import { removeToken } from "../services/authStorage";
import axios from "axios";
import { markNotificationRead } from "../services/notificationApi";

const Topbar = ({ projects = [] }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");
  const filteredProjects = projects.filter((project) =>
    project.name?.toLowerCase().includes(searchText.trim().toLowerCase()),
  );


  const unreadCount = notifications.filter(
  (notification) => !notification.isRead
).length;

  // rest of your code...

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("selectedProject");
    window.location.reload();
  };

  const handleProjectClick = (project) => {
    localStorage.setItem("selectedProject", JSON.stringify(project));

    // Reload so App.jsx opens the selected project
    window.location.reload();
  };

  

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;


    axios
      .get("http://localhost:5000/api/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
.then((response) => {
  setNotifications(response.data);
})
      .catch((error) => {
        console.error("Failed to load notifications:", error);
      });
  }, []);

  return (
    <header
      style={{
        height: "70px",
        background: "#0f172a",
        borderBottom: "1px solid #1f2937",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        boxSizing: "border-box",
        color: "#ffffff",
      }}
    >
      {/* ================= SEARCH ================= */}

      <div
        style={{
          position: "relative",
          width: "360px",
        }}
      >
        {/* Search box */}
        <div
          style={{
            width: "100%",
            height: "40px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "#111827",
            border: "1px solid #1f2937",
            borderRadius: "8px",
            padding: "0 12px",
            boxSizing: "border-box",
          }}
        >
          <Search size={18} color="#9ca3af" />

          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search projects, files..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: "14px",
            }}
          />

          <span
            style={{
              fontSize: "11px",
              color: "#6b7280",
              border: "1px solid #374151",
              padding: "3px 6px",
              borderRadius: "5px",
            }}
          >
            Ctrl K
          </span>
        </div>

        {/* ================= SEARCH RESULTS ================= */}

        {searchText.trim() !== "" && (
          <div
            style={{
              position: "absolute",
              top: "48px",
              left: 0,
              width: "100%",
              background: "#111827",
              border: "1px solid #374151",
              borderRadius: "10px",
              padding: "8px",
              boxSizing: "border-box",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              zIndex: 1000,
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {filteredProjects.length > 0 ? (
              <>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#6b7280",
                    padding: "6px 10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Projects
                </div>

                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      borderRadius: "7px",
                      cursor: "pointer",
                      color: "#e5e7eb",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#1f2937";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <FolderKanban size={17} color="#818cf8" />

                    <div>
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: "500",
                        }}
                      >
                        {project.name}
                      </div>

                      {project.description && (
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#6b7280",
                            marginTop: "2px",
                          }}
                        >
                          {project.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#6b7280",
                  fontSize: "13px",
                }}
              >
                No projects found
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================= RIGHT SIDE ================= */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Notification */}
  {/* Notification */}
<div style={{ position: "relative" }}>
  <button
    onClick={() => setNotificationOpen((current) => !current)}
    style={{
      position: "relative",
      background: "transparent",
      border: "none",
      color: "#d1d5db",
      cursor: "pointer",
      padding: "6px",
      borderRadius: "6px",
    }}
  >
    <Bell size={20} />

{unreadCount > 0 && (
  <span
    style={{
      position: "absolute",
      top: "-5px",
      right: "-5px",
      minWidth: "17px",
      height: "17px",
      padding: "0 4px",
      borderRadius: "999px",
      background: "#6366f1",
      color: "#ffffff",
      fontSize: "9px",
      fontWeight: "700",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid #0f172a",
    }}
  >
    {unreadCount > 9 ? "9+" : unreadCount}
  </span>
)}
  </button>

  {notificationOpen && (
    <div
      style={{
        position: "absolute",
        top: "42px",
        right: 0,
        width: "300px",
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "10px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
        zIndex: 100,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid #1e293b",
          color: "#f8fafc",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        Notifications
      </div>

      {notifications.length === 0 ? (
        <div
          style={{
            padding: "22px 16px",
            color: "#64748b",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          <Bell
            size={22}
            style={{
              marginBottom: "8px",
              opacity: 0.6,
            }}
          />

          <div>No new notifications</div>
        </div>
      ) : (
        notifications.map((notification) => (
<div
  key={notification.id}
  onClick={async () => {
    if (notification.isRead) return;

    try {
      await markNotificationRead(
        notification.id,
        token
      );

      setNotifications((current) =>
        current.map((item) =>
          item.id === notification.id
            ? { ...item, isRead: true }
            : item
        )
      );
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );
    }
  }}
  style={{
              padding: "12px 16px",
              borderBottom: "1px solid #1e293b",
              color: "#cbd5e1",
              fontSize: "12px",
              cursor: "pointer",
              background: notification.isRead
                ? "transparent"
                : "rgba(99, 102, 241, 0.08)",
            }}
          >
            <div
              style={{
                color: "#f8fafc",
                marginBottom: "4px",
                fontWeight: "600",
              }}
            >
              {notification.title}
            </div>

            <div style={{ color: "#64748b" }}>
              {notification.message}
            </div>
          </div>
        ))
      )}
    </div>
  )}
</div>
        {/* ================= PROFILE ================= */}

        <div
          style={{
            position: "relative",
          }}
        >
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              padding: "6px 8px",
              borderRadius: "8px",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#4f46e5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
              }}
            >
              D
            </div>

            {/* Name */}
            <div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Deewanshi
              </div>

              <div
                style={{
                  fontSize: "11px",
                  color: "#9ca3af",
                }}
              >
                Developer
              </div>
            </div>

            <ChevronDown
              size={16}
              color="#9ca3af"
              style={{
                transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "0.2s",
              }}
            />
          </div>

          {/* Profile dropdown */}
          {profileOpen && (
            <div
              style={{
                position: "absolute",
                top: "52px",
                right: "0",
                width: "180px",
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: "10px",
                padding: "8px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  padding: "10px 12px",
                  borderBottom: "1px solid #1f2937",
                  marginBottom: "6px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  Deewanshi
                </div>

                <div
                  style={{
                    fontSize: "11px",
                    color: "#9ca3af",
                    marginTop: "3px",
                  }}
                >
                  Developer
                </div>
              </div>

              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  background: "transparent",
                  border: "none",
                  borderRadius: "7px",
                  color: "#fca5a5",
                  cursor: "pointer",
                  fontSize: "13px",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1f2937";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <LogOut size={17} />

                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
