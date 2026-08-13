import dbConnect from "../../db/dbConnect.js";
import dishModel from "../../db/models/dish.model.mjs";
import { deleteDishImage } from "../file.handler.js";

// CREATE DISH
export const addDish = async (body) => {
  try {
    await dbConnect();

    if (!body.image) {
      body.image = `${process.env.SERVER_HOST}/dishes/no-dish.jpg`;
    }

    const data = await dishModel.create(body);

    return {
      status: "ok",
      message: "Dish created successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error adding dish:", error);
    return {
      status: "error",
      message: "An error occurred while creating the dish",
      data: [],
      error: error.message,
    };
  }
};

// UPDATE DISH
export const updateDish = async (body) => {
  try {
    await dbConnect();

    const dish = await dishModel.findById(body.id);
    if (!dish) {
      return {
        status: "not_found",
        message: "Dish not found",
        data: [],
      };
    }

    if (body.image) {
      await deleteDishImage(dish.image);
    }

    const updatedDish = await dishModel.findByIdAndUpdate(body.id, body, {
      new: true,
    });

    return {
      status: "ok",
      message: "Dish updated successfully",
      data: updatedDish,
    };
  } catch (error) {
    console.error("Error updating dish:", error);
    return {
      status: "error",
      message: "An error occurred while updating the dish",
      data: [],
      error: error.message,
    };
  }
};

// DELETE DISH
export const deleteDish = async (id) => {
  try {
    await dbConnect();

    const dish = await dishModel.findById(id);
    if (!dish) {
      return {
        status: "not_found",
        message: "Dish not found",
        data: [],
      };
    }

    if (dish.image) {
      await deleteDishImage(dish.image);
    }

    const deletedDish = await dishModel.findByIdAndDelete(id);

    return {
      status: "ok",
      message: "Dish deleted successfully",
      data: deletedDish,
    };
  } catch (error) {
    console.error("Error deleting dish:", error);
    return {
      status: "error",
      message: "An error occurred while deleting the dish",
      data: [],
      error: error.message,
    };
  }
};

// GET DISH BY ID
export const getDishById = async (id) => {
  try {
    await dbConnect();

    const dish = await dishModel.findById(id);

    if (!dish) {
      return {
        status: "not_found",
        message: "Dish not found",
        data: [],
      };
    }

    return {
      status: "ok",
      message: "Dish fetched successfully",
      data: dish,
    };
  } catch (error) {
    console.error("Error fetching dish:", error);
    return {
      status: "error",
      message: "An error occurred while fetching the dish",
      data: [],
      error: error.message,
    };
  }
};
