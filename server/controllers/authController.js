import dotenv from "dotenv";
import Stripe from "stripe";
import User from "../models/userSchema.js";
import Admin from "../models/adminSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    }
  );
};

export const register = async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    let user = null;
    if (role === "customer") {
      user = await User.findOne({ email });
    } else if (role === "admin") {
      user = await Admin.findOne({ email });
    }

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (role === "customer") {
      const customer = await stripe.customers.create({
        name,
        email,
      });

      user = new User({
        name,
        email,
        password: hashedPassword,
        name,
        role,
        customerId: customer.id,
      });
    }

    if (role === "admin") {
      user = new Admin({
        name,
        email,
        password: hashedPassword,
        name,
        role,
      });
    }

    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;

  try {
    let user = null;
    const customer = await User.findOne({ email });
    const admin = await Admin.findOne({ email });

    if (customer) {
      user = customer;
    }
    if (admin) {
      user = admin;
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatched) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    const token = generateToken(user);

    const { password, role, ...rest } = user._doc;

    return res
      .status(200)
      .json({
        status: true,
        message: "Successful login",
        token,
        data: { ...rest },
        role,
      });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Failed to login" });
  }
};
