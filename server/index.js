import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import adminRoute from "./routes/admin.js";
import reviewRoute from "./routes/reviews.js";
import productRoute from "./routes/product.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true, // TODO: Remove from prod
};

app.get("/", (req, res) => {
  res.send("API endpoint hit");
});

// database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL;
    mongoose.connect(url);

    const db = mongoose.connection;
    db.once("open", (_) => {
      console.log("Database connected:", url);
    });

    db.on("error", (err) => {
      console.error("Connection error:", err);
    });
  } catch (err) {
    console.log("Error connecting to MongoDB database");
    console.log(err);
  }
};

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/admins", adminRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/products", productRoute);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
