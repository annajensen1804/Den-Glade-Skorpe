import dbConnect from "../../db/dbConnect.js";
import dishModel from "../../db/models/dish.model.mjs";
import ingredientModel from "../../db/models/ingredient.model.mjs";

// CREATE INGREDIENT
export const addIngredient = async (body) => {
  try {
    await dbConnect();

    const data = await ingredientModel.create(body);

    return {
      status: "ok",
      message: "Ingredient created successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error adding ingredient:", error);
    return {
      status: "error",
      message: "An error occurred while creating the ingredient",
      data: [],
      error: error.message,
    };
  }
};

// UPDATE INGREDIENT
export const updateIngredient = async (body) => {
  try {
    await dbConnect();

    const ingredient = await ingredientModel.findById(body.id);
    if (!ingredient) {
      return {
        status: "not_found",
        message: "Ingredient not found",
        data: [],
      };
    }

    const dishes = await dishModel.find({ ingredients: ingredient.name });

    await Promise.all(
      dishes.map((dish) => {
        let index = dish.ingredients.indexOf(ingredient.name);
        if (index !== -1) {
          dish.ingredients[index] = body.name;
        }
        return dishModel.findByIdAndUpdate(
          dish._id,
          { ingredients: dish.ingredients },
          { new: true }
        );
      })
    );

    const updatedIngredient = await ingredientModel.findByIdAndUpdate(
      body.id,
      body,
      {
        new: true,
      }
    );

    return {
      status: "ok",
      message: "Ingredient updated successfully",
      data: updatedIngredient,
    };
  } catch (error) {
    console.error("Error updating ingredient:", error);
    return {
      status: "error",
      message: "An error occurred while updating the ingredient",
      data: [],
      error: error.message,
    };
  }
};

// DELETE INGREDIENT
export const deleteIngredient = async (id) => {
  try {
    await dbConnect();

    const ingredient = await ingredientModel.findById(id);
    if (!ingredient) {
      return {
        status: "not_found",
        message: "Ingredient not found",
        data: [],
      };
    }

    const dishes = await dishModel.find({ ingredients: ingredient.name });

    await Promise.all(
      dishes.map((dish) => {
        dish.ingredients = dish.ingredients.filter(
          (ing) => ing !== ingredient.name
        );
        return dishModel.findByIdAndUpdate(
          dish._id,
          { ingredients: dish.ingredients },
          { new: true }
        );
      })
    );

    const deletedIngredient = await ingredientModel.findByIdAndDelete(id);

    return {
      status: "ok",
      message: "Ingredient deleted successfully",
      data: deletedIngredient,
    };
  } catch (error) {
    console.error("Error deleting ingredient:", error);
    return {
      status: "error",
      message: "An error occurred while deleting the ingredient",
      data: [],
      error: error.message,
    };
  }
};
