import dbConnect from "../../db/dbConnect.js";
import messageModel from "../../db/models/message.model.mjs";

export const getMessages = async () => {
  try {
    await dbConnect();

    const messages = await messageModel.find({});

    return {
      status: "ok",
      message: "Messages fetched successfully",
      data: messages,
    };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return {
      status: "error",
      message: "An error occurred while fetching messages",
      data: [],
      error: error.message,
    };
  }
};
