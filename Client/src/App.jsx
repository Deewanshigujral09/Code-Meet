import { useState } from "react";
import Login from "./components/Login";
import ProjectList from "./components/ProjectList";
import FileExplorer from "./components/FileExplorer";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { getToken } from "./services/authStorage";
import Members from "./components/Members";
import Chat from "./components/Chat";
import Interview from "./components/Interview";

function App() {
  const token = getToken();

  const [activePage, setActivePage] = useState("projects");

  const [selectedProject, setSelectedProject] = useState(() => {
    const savedProject = localStorage.getItem("selectedProject");

    return savedProject
      ? JSON.parse(savedProject)
      : null;
  });

  if (!token) {
    return <Login />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#ffffff",
        display: "flex",
      }}
    >
      {/* SIDEBAR */}
      <Sidebar onNavigate={setActivePage} />

      {/* MAIN AREA */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* TOPBAR */}
        <Topbar />

        {/* CONTENT */}
        <main
          style={{
            flex: 1,
            padding: "28px",
            overflowY: "auto",
            boxSizing: "border-box",
          }}
        >
          {/* INTERVIEWS */}
          {activePage === "interviews" ? (
            <Interview
              projectId={5}
              token={token}
            />
          ) : /* MEMBERS */
          activePage === "members" ? (
            <Members
              workspaceId={2}
              token={token}
            />
          ) : /* CHAT */
          activePage === "chat" ? (
            <Chat
              projectId={5}
              token={token}
            />
          ) : (
            /* PROJECTS */
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
                      border: "1px solid #334155",
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
                    projectId={selectedProject.id}
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