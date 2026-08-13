import express from "express";
import { getOrders } from "../../handlers/orders/orders.handler.js";

const ordersRouter = express.Router();
ordersRouter.get("/orders", async (req, res) => {
  try {
    const result = await getOrders();

    if (result.status === "ok") {
      return res.status(200).send(result);
    }

    return res.status(500).send(result);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default ordersRouter;
