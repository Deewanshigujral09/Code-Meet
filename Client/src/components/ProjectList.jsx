import { useEffect, useState } from "react";

import {
  FolderKanban,
  Plus,
  Search,
  X,
  ArrowRight,
  Code2,
  CalendarDays,
} from "lucide-react";

import { getWorkspaceProjects, createProject } from "../services/projectApi";

import { getWorkspaceMembers } from "../services/memberApi";

const ProjectList = ({ workspaceId, token, onSelectProject }) => {
  // =========================
  // PROJECT STATE
  // =========================

  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // CREATE PROJECT STATE
  // =========================

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // =========================
  // SEARCH STATE
  // =========================

  const [searchText, setSearchText] = useState("");

  // =========================
  // LOAD PROJECTS
  // =========================

  const loadProjects = async () => {
    try {
      setLoading(true);

      const data = await getWorkspaceProjects(workspaceId, token);

      setProjects(data || []);

      const memberData = await getWorkspaceMembers(workspaceId, token);

      setMembers(memberData || []);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [workspaceId, token]);

  // =========================
  // CREATE PROJECT
  // =========================

  const handleCreateProject = async () => {
    if (!name.trim()) {
      return;
    }

    try {
      console.log("TOKEN:", token);
      const newProject = await createProject(
        workspaceId,
        {
          name: name.trim(),
          description: description.trim(),
        },
        token,
      );

      setProjects((currentProjects) => [...currentProjects, newProject]);

      setName("");
      setDescription("");
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  // =========================
  // FILTER PROJECTS
  // =========================

  const filteredProjects = projects.filter((project) => {
    const search = searchText.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return (
      project.name?.toLowerCase().includes(search) ||
      project.description?.toLowerCase().includes(search)
    );
  });

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div
        style={{
          color: "#94a3b8",
          padding: "40px 0",
          fontSize: "14px",
        }}
      >
        Loading projects...
      </div>
    );
  }

  // =========================
  // MAIN UI
  // =========================

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {/* ========================================
          HEADER
      ======================================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "28px",
          gap: "20px",
        }}
      >
        {/* LEFT SIDE */}

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            <FolderKanban size={25} color="#818cf8" />

            <h1
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: "700",
                color: "#f8fafc",
              }}
            >
              Projects
            </h1>
          </div>

          <p
            style={{
              margin: 0,
              color: "#94a3b8",
              fontSize: "14px",
            }}
          >
            Build, collaborate and ship together.
          </p>
        </div>

        {/* NEW PROJECT BUTTON */}

        <button
          onClick={() => setShowForm(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#6366f1",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            padding: "11px 16px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      {/* ========================================
          DASHBOARD STATS

          IMPORTANT:
          This is OUTSIDE the header.
      ======================================== */}

      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "16px",
          marginBottom: "28px",
          boxSizing: "border-box",
        }}
      >
        {/* TOTAL PROJECTS */}

        <div
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: "105px",
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "12px",
            padding: "18px 22px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              color: "#94a3b8",
              fontSize: "13px",
              marginBottom: "10px",
            }}
          >
            Total Projects
          </div>

          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#f8fafc",
            }}
          >
            {projects.length}
          </div>
        </div>

        {/* ACTIVE PROJECTS */}

        <div
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: "105px",
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "12px",
            padding: "18px 22px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              color: "#94a3b8",
              fontSize: "13px",
              marginBottom: "10px",
            }}
          >
            Team Members
          </div>

          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#818cf8",
            }}
          >
            {members.length}
          </div>
        </div>

        {/* WORKSPACE */}

        <div
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: "105px",
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "12px",
            padding: "18px 22px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              color: "#94a3b8",
              fontSize: "13px",
              marginBottom: "10px",
            }}
          >
            Workspace
          </div>

          <div
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#f8fafc",
            }}
          >
            Code Meet
          </div>

          <div
            style={{
              color: "#22c55e",
              fontSize: "12px",
              marginTop: "4px",
            }}
          >
            ● Active
          </div>
        </div>
      </div>

      {/* ========================================
          SEARCH + PROJECT COUNT
      ======================================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {/* SEARCH */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "320px",
            maxWidth: "100%",
            height: "40px",
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "8px",
            padding: "0 12px",
            boxSizing: "border-box",
          }}
        >
          <Search size={17} color="#64748b" />

          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search projects..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#e2e8f0",
              fontSize: "13px",
            }}
          />
        </div>

        {/* COUNT */}

        <span
          style={{
            color: "#64748b",
            fontSize: "13px",
            whiteSpace: "nowrap",
          }}
        >
          {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
        </span>
      </div>

      {/* ========================================
          PROJECT LIST
      ======================================== */}

      {filteredProjects.length === 0 ? (
        <div
          style={{
            border: "1px dashed #334155",
            borderRadius: "12px",
            padding: "70px 20px",
            textAlign: "center",
            background: "#0f172a",
          }}
        >
          <Code2
            size={42}
            color="#6366f1"
            style={{
              marginBottom: "15px",
            }}
          />

          <h3
            style={{
              margin: "0 0 8px",
              color: "#f8fafc",
            }}
          >
            {searchText.trim() ? "No projects found" : "No projects yet"}
          </h3>

          <p
            style={{
              margin: "0 0 20px",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            {searchText.trim()
              ? "Try a different project name."
              : "Create your first project and start coding."}
          </p>

          {!searchText.trim() && (
            <button
              onClick={() => setShowForm(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#4f46e5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#6366f1";
              }}
              style={{
                background: "#6366f1",
                color: "#ffffff",
                border: "none",
                borderRadius: "7px",
                padding: "10px 16px",
                cursor: "pointer",
              }}
            >
              Create Project
            </button>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "18px",
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              style={{
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "12px",
                padding: "20px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                minHeight: "170px",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#4f46e5";

                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1e293b";

                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* PROJECT ICON */}

              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "9px",
                  background: "#1e1b4b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "18px",
                }}
              >
                <Code2 size={21} color="#818cf8" />
              </div>

              {/* PROJECT NAME */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                <FolderKanban size={20} color="#818cf8" />

                <h3
                  style={{
                    margin: 0,
                    color: "#f8fafc",
                    fontSize: "17px",
                    fontWeight: "600",
                  }}
                >
                  {project.name}
                </h3>
              </div>

              {/* DESCRIPTION */}

              <p
                style={{
                  margin: "0 0 20px",
                  color: "#94a3b8",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  minHeight: "40px",
                }}
              >
                {project.description || "No description provided."}
              </p>

              {/* FOOTER */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "14px",
                  borderTop: "1px solid #1e293b",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#64748b",
                    fontSize: "11px",
                  }}
                >
                  <CalendarDays size={13} />
                  Project #{project.id}
                </div>

                <ArrowRight size={17} color="#64748b" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================
          CREATE PROJECT MODAL
      ======================================== */}

      {showForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(2, 6, 23, 0.75)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <div
            style={{
              width: "420px",
              maxWidth: "calc(100vw - 32px)",
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "14px",
              padding: "24px",
              boxSizing: "border-box",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            {/* MODAL HEADER */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: "0 0 5px",
                    color: "#f8fafc",
                    fontSize: "20px",
                  }}
                >
                  Create Project
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    fontSize: "12px",
                  }}
                >
                  Start a new collaborative workspace.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#64748b",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* PROJECT NAME */}

            <label
              style={{
                display: "block",
                color: "#cbd5e1",
                fontSize: "13px",
                marginBottom: "7px",
              }}
            >
              Project name
            </label>

            <input
              type="text"
              placeholder="e.g. Code Interview Platform"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                height: "42px",
                background: "#020617",
                border: "1px solid #334155",
                borderRadius: "7px",
                padding: "0 12px",
                color: "#f8fafc",
                outline: "none",
                boxSizing: "border-box",
                marginBottom: "18px",
              }}
            />

            {/* DESCRIPTION */}

            <label
              style={{
                display: "block",
                color: "#cbd5e1",
                fontSize: "13px",
                marginBottom: "7px",
              }}
            >
              Description
            </label>

            <textarea
              placeholder="What are you building?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                background: "#020617",
                border: "1px solid #334155",
                borderRadius: "7px",
                padding: "10px 12px",
                color: "#f8fafc",
                outline: "none",
                resize: "vertical",
                boxSizing: "border-box",
                marginBottom: "22px",
                fontFamily: "inherit",
              }}
            />

            {/* BUTTONS */}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                onClick={() => setShowForm(false)}
                style={{
                  background: "#1e293b",
                  color: "#cbd5e1",
                  border: "none",
                  borderRadius: "7px",
                  padding: "10px 16px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleCreateProject}
                disabled={!name.trim()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  background: name.trim() ? "#6366f1" : "#312e81",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "7px",
                  padding: "10px 16px",
                  cursor: name.trim() ? "pointer" : "not-allowed",
                }}
              >
                <Plus size={16} />
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
