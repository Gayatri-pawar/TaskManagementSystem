import express from "express";
import {
    getProfile,
    updateProfile,
    changePassword,
} from "../controllers/ProfileController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getProfile);

router.put("/", verifyToken, updateProfile);
router.put("/change-password", verifyToken, changePassword);

export default router;