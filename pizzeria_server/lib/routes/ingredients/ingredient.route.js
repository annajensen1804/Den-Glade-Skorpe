import express from "express";
import auth from "../../middleware/auth.middleware.js";
import {
  addIngredient,
  deleteIngredient,
  updateIngredient,
} from "../../handlers/ingredients/ingredient.handler.js";
import mongoose from "mongoose";

const ingredientRoute = express.Router();

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return false;
  }
  return true;
};

// POST / CREATE
ingredientRoute.post("/ingredient", auth, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({
        status: "error",
        message: "Ingredient name is required",
        data: [],
      });
    }

    const model = { ...req.body };

    const result = await addIngredient(model);

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(201).send(result);
  } catch (error) {
    console.error("Error in POST /ingredient:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// PUT / UPDATE
ingredientRoute.put("/ingredient", auth, async (req, res) => {
  try {
    const { id, name } = req.body;

    if (!id || !name) {
      return res.status(400).send({
        status: "error",
        message: "Ingredient ID and name are required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const model = { ...req.body };

    const result = await updateIngredient(model);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error updating ingredient:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// DELETE -> ID
ingredientRoute.delete("/ingredient/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Ingredient ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await deleteIngredient(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting ingredient:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default ingredientRoute;
