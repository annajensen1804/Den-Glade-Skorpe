import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const dishSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String },
  price: {
    normal: { type: Number, required: true },
    family: { type: Number },
  },
  ingredients: { type: Array},
  category: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

export default mongoose.models.dish || mongoose.model("dish", dishSchema);
