import { Router } from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
  testController,
} from "../controller/register.controller.js";
import { isAdmin, requireSignIn } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.post("/test", requireSignIn, isAdmin, testController);
//protected routes
router.get("/user-route", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/admin-route", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
