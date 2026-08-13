import dbConnect from "../../db/dbConnect.js";
import employeeModel from "../../db/models/employee.model.mjs";

export const getEmployees = async () => {
  try {
    await dbConnect();

    const employees = await employeeModel.find({});

    return {
      status: "ok",
      message: "Employees fetched successfully",
      data: employees,
    };
  } catch (error) {
    console.error("Error fetching employees:", error);
    return {
      status: "error",
      message: "An error occurred while fetching employees",
      data: [],
      error: error.message,
    };
  }
};
