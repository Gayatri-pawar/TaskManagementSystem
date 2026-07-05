import express from "express";
import {
    getAllReports,
    getReportSummary
} from "../controllers/AdminReportController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/summary", verifyToken, getReportSummary);
router.get("/tasks", verifyToken, getAllReports);

export default router;