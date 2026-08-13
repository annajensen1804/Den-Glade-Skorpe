import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  dishes: [
    {
      dish: { type: Schema.Types.ObjectId, ref: "dish", required: true },
      amount: { type: Number, default: 1 },
      size: { type: String },
      extraIngredients: { type: Array },
      _id: false
    },
  ],
  comment: { type: String },
  totalPrice: { type: Number, required: true },
  shipped: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
});

export default mongoose.models.order || mongoose.model("order", orderSchema);
