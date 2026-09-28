import {
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

const Topbar = () => {
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
      {/* Search */}
      <div
        style={{
          width: "360px",
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
          placeholder="Search projects, files..."
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#ffffff",
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

      {/* Right side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Notification */}
        <button
          style={{
            position: "relative",
            background: "transparent",
            border: "none",
            color: "#d1d5db",
            cursor: "pointer",
          }}
        >
          <Bell size={20} />

          <span
            style={{
              position: "absolute",
              top: "-3px",
              right: "-3px",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#6366f1",
            }}
          />
        </button>

        {/* User */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
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

          <ChevronDown size={16} color="#9ca3af" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;