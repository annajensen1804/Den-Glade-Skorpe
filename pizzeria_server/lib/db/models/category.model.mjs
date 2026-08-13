import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const categorySchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  created: { type: Date, default: Date.now }
});

export default mongoose.models.category || mongoose.model("category", categorySchema);