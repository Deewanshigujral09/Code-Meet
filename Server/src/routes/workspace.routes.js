import { Router } from "express";

import {
  createWorkspace,
  getMyWorkspaces,
  getWorkspaceMembers,
  addWorkspaceMember,
} from "../controllers/workspace.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

import {
  requireWorkspaceAdmin,
} from "../middleware/workspace.middleware.js";

const router = Router();

router.post(
  "/",
  authenticate,
  createWorkspace
);

router.get(
  "/",
  authenticate,
  getMyWorkspaces
);

router.get(
  "/:workspaceId/members",
  authenticate,
  getWorkspaceMembers
);

router.post(
  "/:workspaceId/members",
  authenticate,
  requireWorkspaceAdmin,
  addWorkspaceMember
);

export default router;