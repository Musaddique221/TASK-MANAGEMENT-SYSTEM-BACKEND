import express from "express";
import {
  createTask,
  deleteTaskByAdmin,
  editTaskByAdmin,
  getAllTask,
  getTaskById,
  updateTaskByUser,
} from "../controllers/taskController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllTask);
router.post("/", protect, createTask);
router.post("/update", protect, updateTaskByUser);
router.post("/admin/edit", protect, editTaskByAdmin);
router.post("/admin/delete", protect, deleteTaskByAdmin);
router.get("/:id", protect, getTaskById);

export default router;
