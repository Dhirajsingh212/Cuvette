import express from "express";
import {
  LoginFunction,
  LogoutFunction,
  SignupFunction,
  VerifyOTPFunction,
} from "../controllers/auth";
import { authMiddleware } from "../middleware/middleware";
const router = express.Router();

router.route("/login").post(LoginFunction);
router.route("/logout").post(LogoutFunction);
router.route("/signup").post(SignupFunction);
router.route("/verify/otp").post(authMiddleware, VerifyOTPFunction);

export default router;
