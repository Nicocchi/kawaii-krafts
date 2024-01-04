import Admin from "../models/adminSchema.js";

export const updateAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Successfully updated admin",
      data: updatedAdmin,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update admin",
    });
  }
};

export const getSingleAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    const admin = await Admin.findById(id).select("-password");

    res.status(200).json({
      success: true,
      message: "Admin found",
      data: admin,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Failed to find admin" });
  }
};

export const getAllAdmins = async (req, res) => {
  const id = req.params.id;

  try {
    const { query } = req.query;
    let admins;

    if (query) {
      admins = await Admin.find({
        isApproved: "approved",
        $or: [{ name: { $regex: query, $options: "i" } }],
      }).select("-password");
    } else {
      admins = await Admin.find({isApproved: "approved",}).select("-password");
    }

    res.status(200).json({
      success: true,
      message: "Admins found",
      data: admins,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Failed to find admins" });
  }
};

export const deleteAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    await Admin.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Successfully deleted admin" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete admin" });
  }
};

export const getAdminProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await Admin.findById(userId).select("-password");

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    res.status(200).json({ success: true, message: "Admin found", data: admin });
  } catch (err) {
    res.status(500).json({ sucess: false, message: "Internal Server Error" });
  }
};