import { useEffect, useState } from "react";
import {
  getWorkspaceProjects,
  createProject,
} from "../services/projectApi";

const ProjectList = ({ workspaceId, token, onSelectProject }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const loadProjects = async () => {
    try {
      const data = await getWorkspaceProjects(workspaceId, token);
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [workspaceId, token]);

  const handleCreateProject = async () => {
    if (!name.trim()) {
      return;
    }

    try {
      const newProject = await createProject(
        workspaceId,
        {
          name,
          description,
        },
        token
      );

      setProjects((currentProjects) => [
        ...currentProjects,
        newProject,
      ]);

      setName("");
      setDescription("");
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div>
      <h2>Projects</h2>

      <button onClick={() => setShowForm(true)}>
        + New Project
      </button>

      {showForm && (
        <div>
          <h3>Create Project</h3>

          <input
            type="text"
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={handleCreateProject}>
            Create
          </button>

          <button onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </div>
      )}

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
              cursor: "pointer",
            }}
          >
            <h3>{project.name}</h3>
            <p>
              {project.description || "No description"}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectList;