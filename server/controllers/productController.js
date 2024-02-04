import Product from "../models/productSchema.js";
import mongoose from "mongoose";
import { fileUpload } from "./multerController.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("reviews");
    res
      .status(200)
      .json({ success: true, message: "Found products", data: products });
  } catch (err) {
    res.status(404).json({ success: false, message: "Products not found" });
  }
};

export const getSingleProduct = async (req, res) => {
  const id = req.params.id;

  const isValid = mongoose.Types.ObjectId.isValid(id);

  try {
    let product = null;
    if (isValid) {
      product = await Product.find({ _id: id }).populate("reviews");
    } else {
      product = await Product.find({ stripeId: id }).populate("reviews");
    }

    res.status(200).json({
      success: true,
      message: "Product found",
      data: product,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: `Failed to find product with id of ${id}`,
    });
  }
};

export const createProduct = async (req, res) => {
  fileUpload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: err.message });
    }

    console.log(req);
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.user) req.body.user = req.userId;

    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.price ||
      !req.body.quantity
    ) {
      return res.status(400).json({ success: false, message: "bad request" });
    }

    let newProduct = null;
    let savedProduct = null;

    try {
      if (req.file) {
        newProduct = new Product({
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          quantity: req.body.quantity,
          images: [req.file.filename],
          salePrice: req.body.salePrice,
          stock: req.body.stock,
          featured: req.body.featured,
          summary: req.body.summary,
          sku: req.body.sku,
        });

        savedProduct = newProduct.save();
      } else {
        newProduct = new Product({
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          quantity: req.body.quantity,
          salePrice: req.body.salePrice,
          stock: req.body.stock,
          featured: req.body.featured,
          summary: req.body.summary,
          sku: req.body.sku,
        });

        savedProduct = newProduct.save();
      }

      res.status(200).json({
        success: true,
        message: "Product submitted",
        data: savedProduct,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // const result = await fileUpload(req, res);

  // console.log(result);

  // return res.status(200).json({ message: "TEST"});

  // const newProduct = new Product(req.body);

  // try {
  //   const savedProduct = await newProduct.save();
  //   await Product.findByIdAndUpdate(req.body.product, {
  //     $push: { reviews: savedProduct._id },
  //   });

  //   res.status(200).json({
  //     success: true,
  //     message: "Product submitted",
  //     data: savedProduct,
  //   });
  // } catch (err) {
  //   res.status(200).json({ success: false, message: err.message });
  // }
};

// export const updateProduct = async (req, res) => {
//   fileUpload(req, res, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ success: false, message: err.message });
//     }

//     // console.log(req);
//     if (!req.body.product) req.body.product = req.params.productId;
//     if (!req.body.user) req.body.user = req.userId;

//     const prod = Product.findByIdAndUpdate(req.body.product, {
//       $set: req.body.data,
//       $push: { reviews: savedProduct._id },
//       new: false,
//     });

//     let newProduct = null;
//     let savedProduct = null;

//     try {
//       // if (req.file) {
//       //   newProduct = new Product({
//       //     title: req.body.title,
//       //     description: req.body.description,
//       //     price: req.body.price,
//       //     quantity: req.body.quantity,
//       //     images: [req.file.filename],
//       //     salePrice: req.body.salePrice,
//       //     stock: req.body.stock,
//       //     featured: req.body.featured,
//       //     summary: req.body.summary,
//       //     sku: req.body.sku,
//       //   });

//       //   savedProduct = newProduct.save();
//       // } else {
//       //   newProduct = new Product({
//       //     title: req.body.title,
//       //     description: req.body.description,
//       //     price: req.body.price,
//       //     quantity: req.body.quantity,
//       //     salePrice: req.body.salePrice,
//       //     stock: req.body.stock,
//       //     featured: req.body.featured,
//       //     summary: req.body.summary,
//       //     sku: req.body.sku,
//       //   });

//       //   savedProduct = newProduct.save();
//       // }

//       res.status(200).json({
//         success: true,
//         message: "Product submitted",
//         // data: savedProduct,
//       });
//     } catch (error) {
//       res.status(500).json({ success: false, message: error.message });
//     }
//   });
// };