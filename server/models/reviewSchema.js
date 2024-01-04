import mongoose from "mongoose";
import Product from "./productSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (productId) {
  // points to the current review
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  await Product.findByIdAndUpdate(productId, {
    totalRating: stats[0].numOfRating,
    averageRating: stats[0].averageRating,
  });
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.product);
});

export default mongoose.model("Review", reviewSchema);
