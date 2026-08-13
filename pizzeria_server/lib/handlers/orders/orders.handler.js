import dbConnect from "../../db/dbConnect.js";
import orderModel from "../../db/models/order.model.mjs";

export const getOrders = async () => {
  try {
    await dbConnect();

    const orders = await orderModel.find({});

    return {
      status: "ok",
      message: "Orders fetched successfully",
      data: orders,
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      status: "error",
      message: "An error occurred while fetching orders",
      data: [],
      error: error.message,
    };
  }
};
