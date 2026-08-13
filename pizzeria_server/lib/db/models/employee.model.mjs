import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const employeeSchema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  image: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

export default mongoose.models.employee ||
  mongoose.model("employee", employeeSchema);
