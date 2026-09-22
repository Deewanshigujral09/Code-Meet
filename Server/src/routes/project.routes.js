import { Router } from "express";

import {
  createProject,
  getWorkspaceProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

import {
  requireWorkspaceAdmin,
  requireWorkspaceMember,
  requireProjectAdmin,
} from "../middleware/workspace.middleware.js";

const router = Router();

router.post(
  "/workspaces/:workspaceId/projects",
  authenticate,
  requireWorkspaceAdmin,
  createProject
);

router.get(
  "/workspaces/:workspaceId/projects",
  authenticate,
  requireWorkspaceMember,
  getWorkspaceProjects
);

router.get(
  "/projects/:projectId",
  authenticate,
  getProjectById
);

router.put(
  "/projects/:projectId",
  authenticate,
  requireProjectAdmin,
  updateProject
);

router.delete(
  "/projects/:projectId",
  authenticate,
  requireProjectAdmin,
  deleteProject
);

export default router;