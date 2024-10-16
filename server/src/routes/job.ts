import express from "express";
import { CreateJobFunction, GetAllJobFunction } from "../controllers/job";
import { authMiddleware } from "../middleware/middleware";
const router = express.Router();

router.route("/create").post(authMiddleware, CreateJobFunction);
router.route("/getAllJob").get(authMiddleware, GetAllJobFunction);

export default router;
