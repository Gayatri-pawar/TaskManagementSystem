import express from "express";

import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getTaskById,
    updateTaskStatus
} from "../controllers/taskController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createTask);

router.get("/", verifyToken, getTasks);

router.get("/:id", getTaskById);

router.put("/:id", verifyToken, updateTask);

router.delete("/:id", verifyToken, deleteTask);
router.put("/status/:id", verifyToken, updateTaskStatus);



export default router;