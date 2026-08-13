import express from "express";
import { getEmployees } from "../../handlers/employees/employees.handler.js";

const employeesRouter = express.Router();
employeesRouter.get("/employees", async (req, res) => {
  try {
    const data = await getEmployees();

    if (!data) {
      return res.status(404).send({ message: "Employees not found", data: [] });
    }

    if (data.status === "ok") {
      return res.status(200).send({ message: data.message, data: data.data });
    } else {
      return res.status(400).send({ message: data.message, data: [] });
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
});

export default employeesRouter;
