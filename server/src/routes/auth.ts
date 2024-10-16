import express from "express";
import {
  GetVerficationDetails,
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
router.route("/check/verification").get(authMiddleware, GetVerficationDetails);

export default router;
