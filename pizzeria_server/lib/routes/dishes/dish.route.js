import {
  addDish,
  deleteDish,
  getDishById,
  updateDish,
} from "../../handlers/dishes/dish.handler.js";
import express from "express";
import multer from "multer";
import auth from "../../middleware/auth.middleware.js";
import { dishStorage } from "../../db/mcd/misc/mStorage.js";
import mongoose from "mongoose";

const upload = multer({ storage: dishStorage });

const dishRoute = express.Router();

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return false;
  }
  return true;
};

// POST / CREATE
dishRoute.post("/dish", auth, upload.single("file"), async (req, res) => {
  try {
    const { title, price, ingredients, category } = req.body;

    if (!title || !price || !ingredients || !category) {
      return res.status(400).send({
        status: "error",
        message:
          "Please provide all required fields, and at least one ingredient and one category",
        data: [],
      });
    }

    let parsedPriced;
    try {
      parsedPriced = JSON.parse(price);
    } catch (error) {
      return res.status(400).send({
        status: "error",
        message: "Invalid price format",
        data: [],
      });
    }

    if (!parsedPriced.normal) {
      return res.status(400).send({
        status: "error",
        message: "Price requires at minimum a normal size order",
        data: [],
      });
    }
    let parsedIngredients = Array.isArray(ingredients)
      ? ingredients
      : ingredients.split(",");

    const model = {
      title,
      price: parsedPriced,
      ingredients: parsedIngredients,
      category,
    };

    if (req.file) {
      model.image = process.env.SERVER_HOST + "/dishes/" + req.file.filename;
    }

    const result = await addDish(model);

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(201).send(result);
  } catch (error) {
    console.error("Error in POST /dish:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// PUT / UPDATE
dishRoute.put("/dish", auth, upload.single("file"), async (req, res) => {
  try {
    const { id, price, ingredients } = req.body;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Dish ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    let parsedPriced;
    if (typeof price === "string") {
      parsedPriced = JSON.parse(price);
    } else {
      parsedPriced = price;
    }

    if (!parsedPriced.normal) {
      return res.status(400).send({
        status: "error",
        message: "Price requires a normal size order",
        data: [],
      });
    }

    let parsedIngredients = Array.isArray(ingredients)
      ? ingredients
      : ingredients.split(",");

    const model = {
      ...req.body,
      price: parsedPriced,
      ingredients: parsedIngredients,
    };

    if (req.file) {
      model.image = process.env.SERVER_HOST + "/dishes/" + req.file.filename;
    }

    const result = await updateDish(model);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error updating dish:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// DELETE -> ID
dishRoute.delete("/dish/:id", auth, async (req, res) => {
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

    const result = await deleteDish(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting dish:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET BY ID
dishRoute.get("/dish/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Dish ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await getDishById(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error in GET /dish/:id:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default dishRoute;
