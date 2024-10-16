import express from "express";
import { CreateJobFunction } from "../controllers/job";
import { authMiddleware } from "../middleware/middleware";
const router = express.Router();

router.route("/create").post(authMiddleware, CreateJobFunction);

export default router;
