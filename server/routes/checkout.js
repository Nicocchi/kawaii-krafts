import express from "express";
import {
  checkout, paymentHistory
} from "../controllers/checkoutController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router
  .route("/create-checkout-session")
  .post(authenticate, restrict(["customer"]), checkout);

router.route("/payment-history/:id").get(authenticate, restrict(["customer", "admin"]), paymentHistory);
export default router;
