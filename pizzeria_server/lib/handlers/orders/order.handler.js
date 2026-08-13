import dbConnect from "../../db/dbConnect.js";
import orderModel from "../../db/models/order.model.mjs";

// CREATE ORDER
export const addOrder = async (body) => {
  try {
    await dbConnect();

    const order = await orderModel.create(body);

    return {
      status: "ok",
      message: "Order created successfully",
      data: order,
    };
  } catch (error) {
    console.error("Error adding order:", error);
    return {
      status: "error",
      message: "An error occurred while creating the order",
      data: [],
      error: error.message,
    };
  }
};

// UPDATE ORDER
export const updateOrder = async (body) => {
  try {
    await dbConnect();

    const order = await orderModel.findById(body.id);
    if (!order) {
      return {
        status: "not_found",
        message: "Order not found",
        data: [],
      };
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(body.id, body, {
      new: true,
    });

    return {
      status: "ok",
      message: "Order updated successfully",
      data: updatedOrder,
    };
  } catch (error) {
    console.error("Error updating order:", error);
    return {
      status: "error",
      message: "An error occurred while updating the order",
      data: [],
      error: error.message,
    };
  }
};

// DELETE ORDER
export const deleteOrder = async (id) => {
  try {
    await dbConnect();

    const deletedOrder = await orderModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      return {
        status: "not_found",
        message: "Order not found",
        data: [],
      };
    }

    return {
      status: "ok",
      message: "Order deleted successfully",
      data: deletedOrder,
    };
  } catch (error) {
    console.error("Error deleting order:", error);
    return {
      status: "error",
      message: "An error occurred while deleting the order",
      data: [],
      error: error.message,
    };
  }
};
