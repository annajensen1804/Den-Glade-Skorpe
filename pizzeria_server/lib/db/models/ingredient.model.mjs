import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: "No description" },
  created: { type: Date, default: Date.now }
});

export default mongoose.models.ingredient || mongoose.model("ingredient", ingredientSchema);