import dbConnect from "../../db/dbConnect.js";
import messageModel from "../../db/models/message.model.mjs";

// CREATE MESSAGE
export const addMessage = async (body) => {
  try {
    await dbConnect();

    const message = await messageModel.create(body);

    return {
      status: "ok",
      message: "Message created successfully",
      data: message,
    };
  } catch (error) {
    console.error("Error adding message:", error);
    return {
      status: "error",
      message: "An error occurred while creating the message",
      data: [],
      error: error.message,
    };
  }
};

// UPDATE MESSAGE
export const updateMessage = async (body) => {
  try {
    await dbConnect();

    const message = await messageModel.findById(body.id);
    if (!message) {
      return {
        status: "not_found",
        message: "Message not found",
        data: [],
      };
    }

    const updatedMessage = await messageModel.findByIdAndUpdate(body.id, body, {
      new: true,
    });

    return {
      status: "ok",
      message: "Message updated successfully",
      data: updatedMessage,
    };
  } catch (error) {
    console.error("Error updating message:", error);
    return {
      status: "error",
      message: "An error occurred while updating the message",
      data: [],
      error: error.message,
    };
  }
};

// DELETE MESSAGE
export const deleteMessage = async (id) => {
  try {
    await dbConnect();

    const deletedMessage = await messageModel.findByIdAndDelete(id);

    if (!deletedMessage) {
      return {
        status: "not_found",
        message: "Message not found",
        data: [],
      };
    }

    return {
      status: "ok",
      message: "Message deleted successfully",
      data: deletedMessage,
    };
  } catch (error) {
    console.error("Error deleting message:", error);
    return {
      status: "error",
      message: "An error occurred while deleting the message",
      data: [],
      error: error.message,
    };
  }
};
