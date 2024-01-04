import SKU from "../models/skuSchema.js";

export const getAllSKUs = async (req, res) => {
  try {
    const SKUs = await SKU.find({});
    res
      .status(200)
      .json({ success: true, message: "Found SKUs", data: SKUs });
  } catch (err) {
    res.status(404).json({ success: false, message: "SKUs not found" });
  }
};

export const createSKU = async (req, res) => {
  const newSKU = new SKU(req.body);

  try {
    const savedSKU = await newSKU.save();

    res
      .status(200)
      .json({ success: true, message: "SKU submitted", data: savedSKU });
  } catch (err) {
    res.status(200).json({ success: false, message: err.message });
  }
};
