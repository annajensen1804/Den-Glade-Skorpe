import express from "express";
import bcrypt from "bcryptjs";
import multer from "multer";
import auth from "../../middleware/auth.middleware.js";

import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../../handlers/users/user.handler.js";
import { userStorage } from "../../db/mcd/misc/mStorage.js";
import mongoose from "mongoose";

const userRouter = express.Router();

const upload = multer({ storage: userStorage });

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return false;
  }
  return true;
};

// POST
userRouter.post("/user", upload.single("file"), async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
      return res.status(400).send({
        status: "error",
        message: "All fields (name, email, role, password) are required",
        data: [],
      });
    }

    let picture = process.env.SERVER_HOST + "/users/no-user.jpg";
    if (req.file) {
      picture = process.env.SERVER_HOST + "/users/" + req.file.filename;
    }

    const result = await createUser({ name, email, role, password, picture });

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(201).send(result);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// PUT
userRouter.put("/user", auth, upload.single("file"), async (req, res) => {
  try {
    const { id, name, email, role, password } = req.body;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "User ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    if (!name && !email && !role && !password && !req.file) {
      return res.status(400).send({
        status: "error",
        message:
          "At least one field (name, email, role, password, or picture) must be provided for update",
        data: [],
      });
    }

    const updatedUser = { id };

    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (role) updatedUser.role = role;

    if (password) {
      if (password.length < 6) {
        return res.status(400).send({
          status: "error",
          message: "Password must be at least 6 characters long",
          data: [],
        });
      }
      updatedUser.hashedPassword = await bcrypt.hash(password, 10);
    }

    if (req.file) {
      updatedUser.picture =
        process.env.SERVER_HOST + "/users/" + req.file.filename;
    }

    const result = await updateUser(updatedUser);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// DELETE
userRouter.delete("/user/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "User ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await deleteUser(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET By ID
userRouter.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "User ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await getUserById(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default userRouter;
