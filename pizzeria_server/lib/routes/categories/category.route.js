import express from "express";
import multer from "multer";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "../../handlers/categories/category.handler.js";
import auth from "../../middleware/auth.middleware.js";
import { categoryStorage } from "../../db/mcd/misc/mStorage.js";
import mongoose from "mongoose";

const categoryRouter = express.Router();

const upload = multer({ storage: categoryStorage });

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return false;
  }
  return true;
};

// POST / CREATE
categoryRouter.post(
  "/category",
  auth,
  upload.single("file"),
  async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).send({
          status: "error",
          message: "Please provide all required fields",
          data: [],
        });
      }

      const model = { name };

      if (req.file) {
        model.image =
          process.env.SERVER_HOST + "/categories/" + req.file.filename;
      }

      const result = await addCategory(model);

      if (!result || result.status !== "ok") {
        return res.status(500).send({
          status: "error",
          message: result.message || "Failed to add category",
          data: [],
        });
      }

      return res.status(201).send({ ...result });
    } catch (error) {
      console.error("Error adding category:", error);
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

// PUT / UPDATE
categoryRouter.put(
  "/category",
  auth,
  upload.single("file"),
  async (req, res) => {
    try {
      const { id, name } = req.body;

      if (!id) {
        return res.status(400).send({
          status: "error",
          message: "Category ID is required",
          data: [],
        });
      }

      if (!isValidObjectId(id)) return;

      const model = { id, name };

      if (req.file) {
        model.image =
          process.env.SERVER_HOST + "/categories/" + req.file.filename;
      }

      const result = await updateCategory(model);

      if (result.status === "not_found") {
        return res.status(404).send(result);
      }

      if (result.status === "error") {
        return res.status(500).send(result);
      }

      return res.status(200).send(result);
    } catch (error) {
      console.error("Error updating category:", error);
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

// DELETE -> ID
categoryRouter.delete("/category/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "No ID provided",
        data: {},
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await deleteCategory(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default categoryRouter;
