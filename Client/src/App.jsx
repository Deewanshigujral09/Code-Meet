import { useEffect, useState } from "react";
import Login from "./components/Login";
import ProjectList from "./components/ProjectList";
import FileExplorer from "./components/FileExplorer";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { getToken } from "./services/authStorage";
import Members from "./components/Members";
import Chat from "./components/Chat";
import Interview from "./components/Interview";
import { getWorkspaceProjects } from "./services/projectApi";

function App() {
  const token = getToken();

  const [activePage, setActivePage] = useState("projects");

  // =========================
  // PROJECTS FOR SEARCH
  // =========================

  const [projects, setProjects] = useState([]);

  // =========================
  // SELECTED PROJECT
  // =========================

  const [selectedProject, setSelectedProject] = useState(() => {
    const savedProject =
      localStorage.getItem("selectedProject");

    return savedProject
      ? JSON.parse(savedProject)
      : null;
  });

  // =========================
  // LOAD PROJECTS
  // =========================

  useEffect(() => {
    const loadProjects = async () => {
      try {
        if (!token) return;

        const data = await getWorkspaceProjects(
          2,
          token
        );

        console.log("Projects loaded in App:", data);

        setProjects(data || []);
      } catch (error) {
        console.error(
          "Failed to load projects:",
          error
        );
      }
    };

    loadProjects();
  }, [token]);

  // =========================
  // LOGIN CHECK
  // =========================

  if (!token) {
    return <Login />;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#020617",
        color: "#ffffff",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {/* SIDEBAR */}

      <Sidebar
        onNavigate={setActivePage}
      />

      {/* RIGHT SIDE */}

      <div
        style={{
          flex: 1,
          minWidth: 0,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* TOPBAR */}

        <Topbar
          projects={projects}
        />

        {/* MAIN CONTENT */}

        <main
          style={{
            padding: "28px",
            boxSizing: "border-box",
          }}
        >
          {/* =========================
              INTERVIEWS
          ========================= */}

          {activePage === "interviews" ? (
            <Interview
              projectId={5}
              token={token}
            />
          ) : activePage === "members" ? (
            /* =========================
               MEMBERS
            ========================= */

            <Members
              workspaceId={2}
              token={token}
            />
          ) : activePage === "chat" ? (
            /* =========================
               CHAT
            ========================= */

            <Chat
              projectId={5}
              token={token}
            />
          ) : (
            /* =========================
               PROJECTS
            ========================= */

            <>
              {!selectedProject ? (
                <ProjectList
                  workspaceId={2}
                  token={token}
                  onSelectProject={(project) => {
                    setSelectedProject(project);

                    localStorage.setItem(
                      "selectedProject",
                      JSON.stringify(project)
                    );
                  }}
                />
              ) : (
                <div>
                  {/* BACK BUTTON */}

                  <button
                    onClick={() => {
                      setSelectedProject(null);

                      localStorage.removeItem(
                        "selectedProject"
                      );
                    }}
                    style={{
                      background: "transparent",
                      border:
                        "1px solid #334155",
                      color: "#cbd5e1",
                      padding: "8px 14px",
                      borderRadius: "7px",
                      cursor: "pointer",
                      marginBottom: "20px",
                    }}
                  >
                    ← Back to Projects
                  </button>

                  {/* PROJECT NAME */}

                  <h2
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    {selectedProject.name}
                  </h2>

                  {/* FILE EXPLORER */}

                  <FileExplorer
                    projectId={
                      selectedProject.id
                    }
                    token={token}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;