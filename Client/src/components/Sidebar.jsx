import {
  Code2,
  LayoutDashboard,
  FolderKanban,
  Users,
  MessageSquare,
  Video,
  Settings,
} from "lucide-react";

const Sidebar = ({ onNavigate }) => {
  return (
    <aside
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "#111827",
        color: "#ffffff",
        padding: "24px 16px",
        boxSizing: "border-box",
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
        />{" "}
      </nav>

      {/* Bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "24px",
        }}
      >
        <SidebarItem icon={<Settings size={19} />} label="Settings" />
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
