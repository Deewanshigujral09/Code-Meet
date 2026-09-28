import { useState } from "react";
import {
  Code2,
  LayoutDashboard,
  FolderKanban,
  Users,
  MessageSquare,
  Video,
  Settings,
  LogOut,
} from "lucide-react";
import { removeToken } from "../services/authStorage";

const Sidebar = ({ onNavigate }) => {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    removeToken();
    window.location.reload();
  };

  return (
    <aside
      style={{
        width: "240px",
        height: "100vh",
        background: "#111827",
        color: "#ffffff",
        padding: "24px 16px",
        boxSizing: "border-box",
        position: "relative",
        overflowY: "auto",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "40px",
        }}
      >
        <Code2 size={30} />

        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "20px",
            }}
          >
            Code Meet
          </h2>

          <span
            style={{
              fontSize: "11px",
              color: "#9ca3af",
            }}
          >
            Collaborate & Code
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav>
        <SidebarItem
          icon={<LayoutDashboard size={19} />}
          label="Dashboard"
          onClick={() => onNavigate("dashboard")}
        />

        <SidebarItem
          icon={<FolderKanban size={19} />}
          label="Projects"
          onClick={() => onNavigate("projects")}
        />

        <SidebarItem
          icon={<Users size={19} />}
          label="Members"
          onClick={() => onNavigate("members")}
        />

        <SidebarItem
          icon={<MessageSquare size={19} />}
          label="Chat"
          onClick={() => onNavigate("chat")}
        />

        <SidebarItem
          icon={<Video size={19} />}
          label="Interviews"
          onClick={() => onNavigate("interviews")}
        />
      </nav>

      {/* Bottom Section */}
      <div
        style={{
          marginTop: "40px",
          paddingTop: "16px",
          borderTop: "1px solid #1f2937",
        }}
      >
        {/* Settings */}
        <SidebarItem
          icon={<Settings size={19} />}
          label="Settings"
        />

        {/* User Profile */}
        <div
          style={{
            position: "relative",
            marginTop: "10px",
          }}
        >
          <div
            onClick={() => setShowLogout(!showLogout)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              background: showLogout
                ? "#1f2937"
                : "transparent",
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
                fontWeight: "700",
                flexShrink: 0,
              }}
            >
              D
            </div>

            {/* User Details */}
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
          </div>

          {/* Logout Dropdown */}
          {showLogout && (
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                marginTop: "6px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                background: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#f87171",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              <LogOut size={17} />

              Logout
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px",
        marginBottom: "6px",
        borderRadius: "8px",
        color: "#d1d5db",
        cursor: "pointer",
      }}
    >
      {icon}

      <span
        style={{
          fontSize: "14px",
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default Sidebar;