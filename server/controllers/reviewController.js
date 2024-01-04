import Review from "../models/reviewSchema.js";
import Product from "../models/productSchema.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res
      .status(200)
      .json({ success: true, message: "Found reviews", data: reviews });
  } catch (err) {
    res.status(404).json({ success: false, message: "Reviews not found" });
  }
};

export const createReview = async (req, res) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.userId;

  const newReview = new Review(req.body);

  try {
    const savedReview = await newReview.save();
    await Product.findByIdAndUpdate(req.body.product, {
      $push: { reviews: savedReview._id },
    });

    res
      .status(200)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (err) {
    res.status(200).json({ success: false, message: err.message });
  }
};
