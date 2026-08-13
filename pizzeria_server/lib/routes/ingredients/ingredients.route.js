import express from "express";
import { getIngredients } from "../../handlers/ingredients/ingredients.handler.js";

const ingredientsRouter = express.Router();
ingredientsRouter.get("/ingredients", async (req, res) => {
  try {
    const data = await getIngredients();

    if (data.status === "ok") {
      return res.status(200).send({ message: data.message, data: data.data });
    }

    return res.status(500).send({ message: data.message, data: [] });
  } catch (error) {
    console.error("Error in GET /ingredients:", error);
    return res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default ingredientsRouter;
