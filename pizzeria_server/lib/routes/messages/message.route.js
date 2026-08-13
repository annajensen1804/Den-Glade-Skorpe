import express from "express";
import auth from "../../middleware/auth.middleware.js";
import {
  addMessage,
  deleteMessage,
  updateMessage,
} from "../../handlers/messages/message.handler.js";
import mongoose from "mongoose";

const messageRoute = express.Router();

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return false;
  }
  return true;
};

// POST / CREATE
messageRoute.post("/message", async (req, res) => {
  try {
    const { name, subject, description } = req.body;

    if (!name || !subject || !description) {
      return res.status(400).send({
        status: "error",
        message:
          "Please provide all required fields (name, subject, description)",
        data: [],
      });
    }

    const model = { name, subject, description };
    const result = await addMessage(model);

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(201).send(result);
  } catch (error) {
    console.error("Error adding message:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// PUT / UPDATE
messageRoute.put("/message", async (req, res) => {
  try {
    const { id, name, subject, description, status } = req.body;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Message ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    if (!name && !subject && !description && !status) {
      return res.status(400).send({
        status: "error",
        message:
          "At least one field (name, subject, or description) must be provided for update",
        data: [],
      });
    }

    const model = { id, name, subject, description, status };

    const result = await updateMessage(model);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error updating message:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// DELETE -> ID
messageRoute.delete("/message/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Message ID is required",
        data: {},
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await deleteMessage(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting message:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default messageRoute;
