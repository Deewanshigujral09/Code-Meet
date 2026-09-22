import { Router } from "express";

import {
  createProjectFile,
  getProjectFiles,
  getProjectFileById,
  updateProjectFile,
  deleteProjectFile,
} from "../controllers/file.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/projects/:projectId/files",
  authenticate,
  createProjectFile
);

router.get(
  "/projects/:projectId/files",
  authenticate,
  getProjectFiles
);

router.get(
  "/projects/:projectId/files/:fileId",
  authenticate,
  getProjectFileById
);

router.put(
  "/projects/:projectId/files/:fileId",
  authenticate,
  updateProjectFile
);

router.delete(
  "/projects/:projectId/files/:fileId",
  authenticate,
  deleteProjectFile
);

export default router;