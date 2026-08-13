import express from "express";
import multer from "multer";
import auth from "../../middleware/auth.middleware.js";
import { employeeStorage } from "../../db/mcd/misc/mStorage.js";
import {
  addEmployee,
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../handlers/employees/employee.handler.js";
import mongoose from "mongoose";

const upload = multer({ storage: employeeStorage });

const employeeRoute = express.Router();

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return false;
  }
  return true;
};

// POST / CREATE
employeeRoute.post(
  "/employee",
  auth,
  upload.single("file"),
  async (req, res) => {
    try {
      const { name, position } = req.body;

      if (!name || !position) {
        return res.status(400).send({
          status: "error",
          message: "Please provide all required fields (name and position)",
          data: [],
        });
      }

      const model = { name, position };

      if (req.file) {
        model.image =
          process.env.SERVER_HOST + "/employees/" + req.file.filename;
      }

      const result = await addEmployee(model);

      if (result.status !== "ok") {
        return res.status(500).send(result);
      }

      return res.status(201).send(result);
    } catch (error) {
      console.error("Error adding employee:", error);
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

// PUT / UPDATE
employeeRoute.put(
  "/employee",
  auth,
  upload.single("file"),
  async (req, res) => {
    try {
      const { id, name, position } = req.body;

      if (!id) {
        return res.status(400).send({
          status: "error",
          message: "Employee ID is required",
          data: [],
        });
      }

      if (!isValidObjectId(id)) return;

      if (!name && !position && !req.file) {
        return res.status(400).send({
          status: "error",
          message:
            "At least one field (name, position, or image) must be provided for update",
          data: [],
        });
      }

      const model = { id, name, position };

      if (req.file) {
        model.image =
          process.env.SERVER_HOST + "/employees/" + req.file.filename;
      }

      const result = await updateEmployee(model);

      if (result.status === "not_found") {
        return res.status(404).send(result);
      }

      if (result.status === "error") {
        return res.status(500).send(result);
      }

      return res.status(200).send(result);
    } catch (error) {
      console.error("Error updating employee:", error);
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

// DELETE EMPLOYEE BY ID
employeeRoute.delete("/employee/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "No ID provided",
        data: {},
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await deleteEmployee(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET BY ID
employeeRoute.get("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Employee ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await getEmployeeById(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching employee:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default employeeRoute;
