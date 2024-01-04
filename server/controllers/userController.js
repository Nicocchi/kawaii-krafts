import User from "../models/userSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Successfully updated user",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");

    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Failed to find user" });
  }
};

export const getAllUsers = async (req, res) => {
  const id = req.params.id;

  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Failed to find users" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Successfully deleted user" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  try {
    const user = await User.findById(userId).select("-password");

    console.log(user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User found", data: user });
  } catch (err) {
    res.status(500).json({ sucess: false, message: "Internal Server Error" });
  }
};
