import express from "express";
import { authMiddleware } from "../middleware/middleware";
const router = express.Router();

router.route("/create").post(authMiddleware);

export default router;
