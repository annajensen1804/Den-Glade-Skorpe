import express from "express";
import { getDishes } from "../../handlers/dishes/dishes.handler.js";

const dishesRouter = express.Router();
dishesRouter.get("/dishes", async (req, res) => {
  try {
    const data = await getDishes();

    if (data.status === "ok") {
      return res.status(200).send({ message: data.message, data: data.data });
    }

    return res.status(500).send({ message: data.message, data: [] });
  } catch (error) {
    console.error("Error in GET /dishes:", error);
    return res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default dishesRouter;
