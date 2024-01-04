import Product from "../models/productSchema.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('reviews');
    res
      .status(200)
      .json({ success: true, message: "Found products", data: products });
  } catch (err) {
    console.log(err);
    res.status(404).json({ success: false, message: "Products not found" });
  }
};

export const createProduct = async (req, res) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.userId;

  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    await Product.findByIdAndUpdate(req.body.product, {
      $push: { reviews: savedProduct._id },
    });

    res
      .status(200)
      .json({ success: true, message: "Product submitted", data: savedProduct });
  } catch (err) {
    res.status(200).json({ success: false, message: err.message });
  }
};
