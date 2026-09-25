import { useEffect, useState } from "react";
import Login from "./components/Login";
import ProjectList from "./components/ProjectList";
import FileExplorer from "./components/FileExplorer";
import { getToken } from "./services/authStorage";
function App() {
  const token = getToken();
  const [selectedProject, setSelectedProject] = useState(() => {
    const savedProject = localStorage.getItem("selectedProject");

    return savedProject ? JSON.parse(savedProject) : null;
  });
  if (!token) {
    return <Login />;
  }

  return (
    <div>
      <h1>Code Meet</h1>

      {!selectedProject ? (
        <ProjectList
          workspaceId={2}
          token={token}
          onSelectProject={(project) => {
            setSelectedProject(project);
            localStorage.setItem("selectedProject", JSON.stringify(project));
          }}
        />
      ) : (
        <div>
          <button
            onClick={() => {
              setSelectedProject(null);
              localStorage.removeItem("selectedProject");
            }}
          >
            ← Back to Projects
          </button>

          <h2>{selectedProject.name}</h2>

          <FileExplorer projectId={selectedProject.id} token={token} />
        </div>
      )}
    </div>
  );
}

export default App;
