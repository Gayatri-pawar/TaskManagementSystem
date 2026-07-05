import express from "express";
import {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getMyTasks
} from "../controllers/employeeController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getEmployees);
router.get("/my-tasks", verifyToken, getMyTasks);
router.get("/:id", verifyToken, getEmployeeById);
router.post("/", verifyToken, createEmployee);
router.put("/:id", verifyToken, updateEmployee);
router.delete("/:id", verifyToken, deleteEmployee);
// router.get("/my-tasks", verifyToken, getMyTasks);


export default router;