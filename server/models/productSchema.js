import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  attributes: {
    size: {
        width: Number,
        height: Number,
        length: Number,
    },
    color: String,


  },
  price: { type: Number, required: true },
  salePrice: Number,
  sale: Boolean,
  quantity: { type: Number, required: true },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review"}],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  sku: { type: mongoose.Types.ObjectId, ref: "Sku" },
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
