import dbConnect from "../../db/dbConnect.js";
import userModel from "../../db/models/user.model.mjs";

export const getUsers = async () => {
  try {
    await dbConnect();

    const users = await userModel.find({}).select("-password -__v");

    console.log(users);

    return {
      status: "ok",
      message: "Users fetched successfully",
      data: users,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      status: "error",
      message: "An error occurred while fetching users",
      data: [],
      error: error.message,
    };
  }
};
