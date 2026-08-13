import express from "express";
import { getUsers } from "../../handlers/users/users.handler.js";

const usersRouter = express.Router();
usersRouter.get("/users", async (req, res) => {
  try {
    const result = await getUsers();

    if (result.status === "ok") {
      return res.status(200).send(result);
    }

    return res.status(500).send(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default usersRouter;
