import express from "express";
import {
  getAllSKUs,
  createSKU,
} from "../controllers/skuController.js";
import { authenticate, restrict } from "./../auth/verifyToken.js";

const router = express.Router();

router
  .route("/")
  .get(getAllSKUs)
  .post(authenticate, restrict(["admin"]), createSKU);

export default router;
