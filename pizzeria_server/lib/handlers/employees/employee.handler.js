import dbConnect from "../../db/dbConnect.js";
import employeeModel from "../../db/models/employee.model.mjs";
import { deleteEmployeeImage } from "../file.handler.js";

// CREATE EMPLOYEE
export const addEmployee = async (body) => {
  try {
    await dbConnect();

    if (!body.image) {
      body.image = `${process.env.SERVER_HOST}/employees/no-employee.jpg`;
    }

    const employee = await employeeModel.create(body);

    return {
      status: "ok",
      message: "Employee created successfully",
      data: employee,
    };
  } catch (error) {
    console.error("Error adding employee:", error);
    return {
      status: "error",
      message: "An error occurred while creating the employee",
      data: [],
      error: error.message,
    };
  }
};

// UPDATE EMPLOYEE
export const updateEmployee = async (body) => {
  try {
    await dbConnect();

    const employee = await employeeModel.findById(body.id);
    if (!employee) {
      return {
        status: "not_found",
        message: "Employee not found",
        data: [],
      };
    }

    if (body.image && employee.image) {
      await deleteEmployeeImage(employee.image);
    }

    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      body.id,
      body,
      { new: true }
    );

    return {
      status: "ok",
      message: "Employee updated successfully",
      data: updatedEmployee,
    };
  } catch (error) {
    console.error("Error updating employee:", error);
    return {
      status: "error",
      message: "An error occurred while updating the employee",
      data: [],
      error: error.message,
    };
  }
};

// DELETE EMPLOYEE
export const deleteEmployee = async (id) => {
  try {
    await dbConnect();

    const employee = await employeeModel.findById(id);
    if (!employee) {
      return {
        status: "not_found",
        message: "Employee not found",
        data: [],
      };
    }

    if (employee.image) {
      await deleteEmployeeImage(employee.image);
    }

    await employeeModel.findByIdAndDelete(id);
    return {
      status: "ok",
      message: "Employee deleted successfully",
      data: employee,
    };
  } catch (error) {
    console.error("Error deleting employee:", error);
    return {
      status: "error",
      message: "An error occurred while deleting the employee",
      data: [],
      error: error.message,
    };
  }
};

// GET EMPLOYEE BY ID
export const getEmployeeById = async (id) => {
  try {
    await dbConnect();

    const employee = await employeeModel.findById(id);

    if (!employee) {
      return {
        status: "not_found",
        message: "Employee not found",
        data: [],
      };
    }

    return {
      status: "ok",
      message: "Employee fetched successfully",
      data: employee,
    };
  } catch (error) {
    console.error("Error fetching employee:", error);
    return {
      status: "error",
      message: "An error occurred while fetching the employee",
      data: [],
      error: error.message,
    };
  }
};
