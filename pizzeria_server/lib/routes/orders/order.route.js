import express from "express";
import auth from "../../middleware/auth.middleware.js";
import {
  addOrder,
  deleteOrder,
  updateOrder,
} from "../../handlers/orders/order.handler.js";
import mongoose from "mongoose";

const orderRoute = express.Router();

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return false;
  }
  return true;
};

// POST / CREATE
orderRoute.post("/order", async (req, res) => {
  try {
    const { dishes, comment, totalPrice, shipped } = req.body;

    if (!dishes || !Array.isArray(dishes) || dishes.length === 0) {
      return res.status(400).send({
        status: "error",
        message: "Order must contain at least one dish",
        data: [],
      });
    }

    if (!totalPrice || typeof totalPrice !== "number") {
      return res.status(400).send({
        status: "error",
        message: "Total price is required and must be a number",
        data: [],
      });
    }

    const model = {
      dishes,
      comment: comment || "",
      totalPrice,
      shipped: shipped || false,
    };

    const result = await addOrder(model);

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(201).send(result);
  } catch (error) {
    console.error("Error adding order:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// PUT / UPDATE
orderRoute.put("/order", async (req, res) => {
  try {
    const { id, dishes, comment, totalPrice, shipped } = req.body;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Order ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    if (
      !dishes &&
      !comment &&
      totalPrice === undefined &&
      shipped === undefined
    ) {
      return res.status(400).send({
        status: "error",
        message:
          "At least one field (dishes, comment, totalPrice, or shipped) must be provided for update",
        data: [],
      });
    }

    const model = { id, dishes, comment, totalPrice, shipped };

    const result = await updateOrder(model);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// DELETE -> ID
orderRoute.delete("/order/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Order ID is required",
        data: {},
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await deleteOrder(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default orderRoute;
