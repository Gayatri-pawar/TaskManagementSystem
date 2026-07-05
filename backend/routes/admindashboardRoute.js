import express from "express";
import {
    getDashboardSummary,
    getRecentTasks
} from "../controllers/adminDashboardController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/summary", verifyToken, getDashboardSummary);
router.get("/recent-tasks", verifyToken, getRecentTasks);

export default router;