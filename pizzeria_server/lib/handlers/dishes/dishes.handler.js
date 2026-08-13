import dbConnect from "../../db/dbConnect.js";
import dishModel from "../../db/models/dish.model.mjs";

export const getDishes = async () => {
  try {
    await dbConnect();

    const dishes = await dishModel.find({});

    return {
      status: "ok",
      message: "Dishes fetched successfully",
      data: dishes,
    };
  } catch (error) {
    console.error("Error fetching dishes:", error);
    return {
      status: "error",
      message: "An error occurred while fetching dishes",
      data: [],
      error: error.message,
    };
  }
};
