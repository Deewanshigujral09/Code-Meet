import { db } from "../prisma/db.js";

export const createProject = async (req, res) => {
  try {
    const workspaceId = Number(req.params.workspaceId);
    const { name, description } = req.body;

    if (!workspaceId || !name) {
      return res.status(400).json({
        message: "Workspace ID and project name are required",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const project = await db.orm.public.Project.create({
      workspaceId,
      name,
      description,
    });

    const members = await db.orm.public.WorkspaceMember
  .where({
    workspaceId: req.params.workspaceId,
  })
  .all();

for (const member of members) {
  if (member.userId !== req.user.userId) {
await db.orm.public.Notification.create({
  userId: member.userId,
  title: "New project created",
  message: `${project.name} was created in your workspace`,
  type: "PROJECT_CREATED",
});
  }
}
    return res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Create project error:", error);

    return res.status(500).json({
      message: "Failed to create project",
    });
  }
};

export const getWorkspaceProjects = async (req, res) => {
  try {
    const workspaceId = Number(req.params.workspaceId);

    if (!workspaceId) {
      return res.status(400).json({
        message: "Invalid workspace ID",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const projects = await db.orm.public.Project
      .where({ workspaceId })
      .all();

    return res.status(200).json({
      projects,
    });
  } catch (error) {
    console.error("Get workspace projects error:", error);

    return res.status(500).json({
      message: "Failed to fetch workspace projects",
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const projectId = Number(req.params.projectId);

    if (!projectId) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const project = await db.orm.public.Project
      .where({ id: projectId })
      .first();

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    return res.status(200).json({
      project,
    });
  } catch (error) {
    console.error("Get project error:", error);

    return res.status(500).json({
      message: "Failed to fetch project",
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const projectId = Number(req.params.projectId);
    const { name, description } = req.body;

    if (!projectId) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if (!name) {
      return res.status(400).json({
        message: "Project name is required",
      });
    }

    const project = await db.orm.public.Project
      .where({ id: projectId })
      .first();

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const updatedProject = await db.orm.public.Project
      .where({ id: projectId })
      .update({
        name,
        description,
      });

    return res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Update project error:", error);

    return res.status(500).json({
      message: "Failed to update project",
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const projectId = Number(req.params.projectId);

    if (!projectId) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const project = await db.orm.public.Project
      .where({ id: projectId })
      .first();

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    await db.orm.public.Project
      .where({ id: projectId })
      .delete();

    return res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    return res.status(500).json({
      message: "Failed to delete project",
    });
  }
};