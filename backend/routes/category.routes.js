import { Router } from "express";
import { isAdmin, requireSignIn } from "../middleware/auth.middleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategory,
  getCategoryProductController,
  getSingleCategory,
  updateCategoryController,
} from "../controller/category.controller.js";
const router = Router();

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

router.get("/get-category", getAllCategory);

router.get("/single-category/:slug", getSingleCategory);

router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

router.get("/get-category/:slug", getCategoryProductController);
export default router;
