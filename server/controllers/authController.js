import dotenv from "dotenv";
import Stripe from "stripe";
import User from "../models/userSchema.js";
import Admin from "../models/adminSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

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

    // email user
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: {
        name: "Kawaii Krafts",
        address: process.env.EMAIL_USER,
      },
      to: [email],
      subject: "Thank you for regeresting to Kawaii Krafts",
      text: "Thank you for regeresting to Kawaii Krafts",
      html: `<b>Thank you for regeresting to Kawaii Krafts ${name}</b>`,
    });

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

    return res.status(200).json({
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

export const forgot = async (req, res) => {
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

    // link valid for 15 minutes - one time only
    const secret = process.env.JWT_SECRET_KEY + user.password;
    const payload = {
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `http://localhost:5173/auth/reset/${user._id}/${token}`;

    // email user
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: {
        name: "Kawaii Krafts",
        address: process.env.EMAIL_USER,
      },
      to: [email],
      subject: "Reset Password",
      text: "Reset password",
      html: `<p>Here is a link to reset your password. The link will expire in 15 minutes</p><a href="${link}">Click here to reset password</a>`,
    });

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

export const reset = async (req, res) => {
  const { id, token } = req.params;

  if (!id || !token) {
    return res.status(400).json({ success: false, message: " bad request" });
  }

  try {
    let user = null;
    const customer = await User.findOne({ _id: id });
    const admin = await Admin.findOne({ _id: id });

    if (customer) {
      user = customer;
    }
    if (admin) {
      user = admin;
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const secret = process.env.JWT_SECRET_KEY + user.password;
    const payload = jwt.verify(token, secret);

    if (customer) {
      user = customer;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const upd = {
        password: hashedPassword,
      };

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: upd },
        { new: true }
      ).select("-password");
    }

    if (admin) {
      user = admin;
    }

    return res
      .status(200)
      .json({ success: true, message: "Password successfully reset" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const resetp = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: " bad request" });
  }

  try {
    let user = null;
    const customer = await User.findOne({ _id: id });
    const admin = await Admin.findOne({ _id: id });

    if (customer) {
      user = customer;
    }
    if (admin) {
      user = admin;
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (customer) {
      user = customer;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const upd = {
        password: hashedPassword,
      };

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: upd },
        { new: true }
      ).select("-password");
    }

    if (admin) {
      user = admin;
    }

    return res
      .status(200)
      .json({ success: true, message: "Password successfully reset" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};