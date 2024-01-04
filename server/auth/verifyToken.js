import jwt from "jsonwebtoken";
import Admin from "../models/adminSchema.js";
import User from "../models/userSchema.js";

export const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "Token not found. Denied." });
  }

  try {
    const token = authToken.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Expired token" });
    }

    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  let user;

  const customer = await User.findById(userId);
  const admin = await Admin.findById(userId);

  if (customer) {
    user = customer;
  }
  if (admin) {
    user = admin;
  }

  if (!roles.includes(user.role)) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  next();
};
