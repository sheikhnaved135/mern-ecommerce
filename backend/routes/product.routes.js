import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  getPhotoController,
  getProductController,
  getSingleProductController,
  productFilterController,
  productListController,
  totalCountController,
  updateProductController,
} from "../controller/product.controller.js";
import { isAdmin, requireSignIn } from "../middleware/auth.middleware.js";
import formidable from "express-formidable";
const router = Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.post(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

router.get("/get-product", getProductController);

router.get("/get-product/:slug", getSingleProductController);

router.get("/get-photo/:pid", getPhotoController);

router.delete("/delete-product/:pid", deleteProductController);

router.post("/product-filter", productFilterController);

router.get("/total-count", totalCountController);

router.get("/product-list/:page", productListController);

export default router;
