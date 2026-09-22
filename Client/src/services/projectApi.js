import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getWorkspaceProjects = async (workspaceId, token) => {
  const response = await axios.get(
    `${API_URL}/workspaces/${workspaceId}/projects`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.projects;
};

export const createProject = async (workspaceId, projectData, token) => {
  const response = await axios.post(
    `${API_URL}/workspaces/${workspaceId}/projects`,
    projectData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.project;
};