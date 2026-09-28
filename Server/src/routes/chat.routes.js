import { Router } from "express";
import {
  getProjectMessages,
  createProjectMessage,
} from "../controllers/chat.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/projects/:projectId/chat",
  authenticate,
  getProjectMessages
);

router.post(
  "/projects/:projectId/chat",
  authenticate,
  createProjectMessage
);

export default router;