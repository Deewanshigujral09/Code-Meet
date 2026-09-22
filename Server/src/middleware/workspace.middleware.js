import { db } from "../prisma/db.js";

export const requireWorkspaceAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const workspaceId = Number(req.params.workspaceId);

    if (!workspaceId) {
      return res.status(400).json({
        message: "Invalid workspace ID",
      });
    }

    const membership = await db.orm.public.WorkspaceMember
      .where({
        workspaceId,
        userId: req.user.userId,
      })
      .first();

    if (!membership) {
      return res.status(403).json({
        message: "You are not a member of this workspace",
      });
    }

    if (
      membership.role !== "OWNER" &&
      membership.role !== "ADMIN"
    ) {
      return res.status(403).json({
        message: "You do not have permission to perform this action",
      });
    }

    next();
  } catch (error) {
    console.error("Workspace authorization error:", error);

    return res.status(500).json({
      message: "Authorization check failed",
    });
  }
};

export const requireWorkspaceMember = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const workspaceId = Number(req.params.workspaceId);

    if (!workspaceId) {
      return res.status(400).json({
        message: "Invalid workspace ID",
      });
    }

    const membership = await db.orm.public.WorkspaceMember
      .where({
        workspaceId,
        userId: req.user.userId,
      })
      .first();

    if (!membership) {
      return res.status(403).json({
        message: "You are not a member of this workspace",
      });
    }

    next();
  } catch (error) {
    console.error("Workspace membership check error:", error);

    return res.status(500).json({
      message: "Workspace access check failed",
    });
  }
};

export const requireProjectAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const projectId = Number(req.params.projectId);

    if (!projectId) {
      return res.status(400).json({
        message: "Invalid project ID",
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

    const membership = await db.orm.public.WorkspaceMember
      .where({
        workspaceId: Number(project.workspaceId),
        userId: Number(req.user.userId),
      })
      .first();

    if (!membership) {
      return res.status(403).json({
        message: "You are not a member of this workspace",
      });
    }

    if (
      membership.role !== "OWNER" &&
      membership.role !== "ADMIN"
    ) {
      return res.status(403).json({
        message: "You do not have permission to perform this action",
      });
    }

    next();
  } catch (error) {
    console.error("Project authorization error:", error);

    return res.status(500).json({
      message: "Authorization check failed",
    });
  }
};