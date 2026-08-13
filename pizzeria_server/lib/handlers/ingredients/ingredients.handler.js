import dbConnect from "../../db/dbConnect.js";
import ingredientModel from "../../db/models/ingredient.model.mjs";

export const getIngredients = async () => {
  try {
    await dbConnect();

    const ingredients = await ingredientModel.find({});

    return {
      status: "ok",
      message: "Ingredients fetched successfully",
      data: ingredients,
    };
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return {
      status: "error",
      message: "An error occurred while fetching ingredients",
      data: [],
      error: error.message,
    };
  }
};
