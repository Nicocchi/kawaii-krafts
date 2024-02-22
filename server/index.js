import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import adminRoute from "./routes/admin.js";
import reviewRoute from "./routes/reviews.js";
import productRoute from "./routes/product.js";
import skuRoute from "./routes/skus.js";
import checkoutRoute from "./routes/checkout.js";
import bodyParser from "body-parser";

const imageDir = process.env.IMAGE_DIR || "public";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use('/static', express.static(imageDir))

// middleware
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
  origin: process.env.ORIGIN
};
app.use(cors(corsOptions));



app.post('/webhook', express.raw({ type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      break;
    case 'customer.created':
      const customerCreated = event.data.object;
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send();
});

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


app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/admins", adminRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/skus", skuRoute);
app.use("/api/v1/orders", checkoutRoute);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
