import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getWorkspaceMembers = async (workspaceId, token) => {
  const response = await axios.get(
    `${API_URL}/workspaces/${workspaceId}/members`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.members;
};