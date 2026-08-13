import express from "express";
import { getCategories } from "../../handlers/categories/categories.handler.js";

const categoriesRouter = express.Router();
categoriesRouter.get("/categories", async (req, res) => {
  try {
    const data = await getCategories();

    if (data.status === "ok") {
      return res.status(200).send({ message: data.message, data: data.data });
    }

    return res.status(500).send({ message: data.message, data: [] });
  } catch (error) {
    console.error("Error in GET /categories:", error);
    return res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default categoriesRouter;
