import express from "express";
import {
  signupUser,
  loginUser,
  getAllUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", signupUser);
router.post("/login", loginUser);

// Protected routes
router.get("/users", getAllUser);
router.put("/users/:id", protect, updateUser);
router.delete("/users/:id", protect, deleteUser);

export default router;
