import { useEffect, useState } from "react";
import Login from "./components/Login";
import ProjectList from "./components/ProjectList";
import FileExplorer from "./components/FileExplorer";
import { getToken } from "./services/authStorage";
import { connectWebSocket } from "./services/websocket";
function App() {
useEffect(() => {
  const websocket = connectWebSocket();

  setSocket(websocket);

  return () => {
    websocket.close();
  };
}, []);

  const token = getToken();
  const [selectedProject, setSelectedProject] = useState(null);
  const [socket, setSocket] = useState(null);
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
          onSelectProject={setSelectedProject}
        />
      ) : (
        <div>
          <button onClick={() => setSelectedProject(null)}>
            ← Back to Projects
          </button>

          <h2>{selectedProject.name}</h2>

          <FileExplorer
            projectId={selectedProject.id}
            token={token}
            socket={socket}
          />
        </div>
      )}
    </div>
  );
}

export default App;
