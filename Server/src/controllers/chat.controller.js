import { db } from "../prisma/db.js";

export const getProjectMessages = async (req, res) => {
  try {
    const projectId = Number(req.params.projectId);

    if (!projectId) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

const messages = await db.orm.public.ChatMessage
  .where({
    projectId,
  })
  .all();

    return res.status(200).json({
      messages,
    });
  } catch (error) {
    console.error("Get project messages error:", error?.message);

    return res.status(500).json({
      message: error?.message || "Failed to fetch messages",
    });
  }
};

export const createProjectMessage = async (req, res) => {
  try {
    const projectId = Number(req.params.projectId);
    const { message } = req.body;

    if (!projectId) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

    if (!message?.trim()) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const newMessage = await db.orm.public.ChatMessage.create({
      projectId,
      userId: req.user.userId,
      message: message.trim(),
    });

    return res.status(201).json({
      message: newMessage,
    });
  } catch (error) {
    console.error("Create project message error:", error?.message);

    return res.status(500).json({
      message: error?.message || "Failed to create message",
    });
  }
};