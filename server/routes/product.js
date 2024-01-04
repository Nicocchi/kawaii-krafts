import express from "express";
import {
  getAllProducts,
  createProduct,
  getSingleProduct,
} from "../controllers/productController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from "./reviews.js";

const router = express.Router();

router.use('/:productId/reviews', reviewRouter);

router
  .route("/")
  .get(getAllProducts)
  .post(authenticate, restrict(["admin"]), createProduct);

router.get("/:id", getSingleProduct);

// router.get("/:id", authenticate, restrict(['admin']), getSingleAdmin);
// router.get("/", authenticate, restrict(['admin']), getAllProducts);
// router.put("/:id", authenticate, restrict(['admin']), updateAdmin);
// router.delete("/:id", authenticate, restrict(['admin']), deleteAdmin);

export default router;
