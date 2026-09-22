import { db } from "../prisma/db.js";

export const createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Workspace name is required",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const workspace = await db.orm.public.Workspace.create({
      name,
      description,
      ownerId: req.user.userId,
    });

    await db.orm.public.WorkspaceMember.create({
      workspaceId: workspace.id,
      userId: req.user.userId,
      role: "OWNER",
    });

    return res.status(201).json({
      message: "Workspace created successfully",
      workspace,
    });
  } catch (error) {
    console.error("Create workspace error:", error);

    return res.status(500).json({
      message: "Failed to create workspace",
    });
  }
};

export const getMyWorkspaces = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const workspaces = await db.orm.public.Workspace
      .where({
        ownerId: req.user.userId,
      })
      .all();

    return res.status(200).json({
      workspaces,
    });
  } catch (error) {
    console.error("Get workspaces error:", error);

    return res.status(500).json({
      message: "Failed to fetch workspaces",
    });
  }
};

export const getWorkspaceMembers = async (req, res) => {
  try {
    const workspaceId = Number(req.params.workspaceId);

    if (!workspaceId) {
      return res.status(400).json({
        message: "Invalid workspace ID",
      });
    }

    const members = await db.orm.public.WorkspaceMember
      .where({
        workspaceId,
      })
      .all();

    return res.status(200).json({
      members,
    });
  } catch (error) {
    console.error("Get workspace members error:", error);

    return res.status(500).json({
      message: "Failed to fetch workspace members",
    });
  }
};

export const addWorkspaceMember = async (req, res) => {
  try {
    const workspaceId = Number(req.params.workspaceId);
    const { userId, role } = req.body;

    if (!workspaceId || !userId) {
      return res.status(400).json({
        message: "Workspace ID and user ID are required",
      });
    }

    const member = await db.orm.public.WorkspaceMember.create({
      workspaceId,
      userId,
      role: role || "MEMBER",
    });

    return res.status(201).json({
      message: "Member added successfully",
      member,
    });
  } catch (error) {
    console.error("Add workspace member error:", error);

    return res.status(500).json({
      message: "Failed to add workspace member",
    });
  }
};