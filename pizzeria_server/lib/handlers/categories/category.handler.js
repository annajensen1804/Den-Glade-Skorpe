import dbConnect from "../../db/dbConnect.js";
import categoryModel from "../../db/models/category.model.mjs";
import dishModel from "../../db/models/dish.model.mjs";
import { deleteCategoryImage } from "../file.handler.js";

// CREATE CATEGORY
export const addCategory = async (body) => {
  try {
    await dbConnect();

    if (!body.image) {
      body.image = `${process.env.SERVER_HOST}/categories/no-category.jpg`;
    }

    const data = await categoryModel.create(body);

    return {
      status: "ok",
      message: "Category created successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error adding category:", error);

    return {
      status: "error",
      message: "An error occurred while creating the category",
      data: [],
      error: error.message,
    };
  }
};

// UPDATE CATEGORY
export const updateCategory = async (body) => {
  try {
    await dbConnect();

    const category = await categoryModel.findById(body.id);
    if (!category) {
      return {
        status: "not_found",
        message: "Category not found",
        data: [],
      };
    }

    if (body.image) {
      await deleteCategoryImage(category.image);
    }

    const dishes = await dishModel.find({ category: category.name });

    await Promise.all(
      dishes.map((dish) =>
        dishModel.findByIdAndUpdate(
          dish._id,
          { category: body.name },
          { new: true }
        )
      )
    );

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      body.id,
      body,
      {
        new: true,
      }
    );

    return {
      status: "ok",
      message: "Category updated successfully",
      data: updatedCategory,
    };
  } catch (error) {
    console.error("Error updating category:", error);
    return {
      status: "error",
      message: "An error occurred while updating the category",
      data: [],
      error: error.message,
    };
  }
};

// DELETE CATEGORY
export const deleteCategory = async (id) => {
  try {
    await dbConnect();

    const category = await categoryModel.findById(id);
    if (!category) {
      return {
        status: "not_found",
        message: "Category not found",
        data: [],
      };
    }

    if (category.image) {
      await deleteCategoryImage(category.image);
    }

    const dishes = await dishModel.find({ category: category.name });

    await Promise.all(
      dishes.map((dish) =>
        dishModel.findByIdAndUpdate(
          dish._id,
          { category: "Uncategorized" },
          { new: true }
        )
      )
    );

    const deletedCategory = await categoryModel.findByIdAndDelete(id);

    return {
      status: "ok",
      message: "Category deleted successfully",
      data: deletedCategory,
    };
  } catch (error) {
    console.error("Error deleting category:", error);
    return {
      status: "error",
      message: "An error occurred while deleting the category",
      data: [],
      error: error.message,
    };
  }
};
