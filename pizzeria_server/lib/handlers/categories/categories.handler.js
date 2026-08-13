import dbConnect from "../../db/dbConnect.js";
import categoryModel from "../../db/models/category.model.mjs";

export const getCategories = async () => {
  try {
    await dbConnect();

    const categories = await categoryModel.find({});

    return {
      status: "ok",
      message: "Categories fetched successfully",
      data: categories,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      status: "error",
      message: "An error occurred while fetching categories",
      data: [],
      error: error.message,
    };
  }
};
