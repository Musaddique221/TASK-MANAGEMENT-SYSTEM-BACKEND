import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import { startReminderScheduler } from "./cron/reminderCron.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();
startReminderScheduler();

app.get("/", (req, res) => {
  res.json("TASK MANAGEMENT SYSTEM BACKEND IS RUNNING");
});

app.use("/auth", userRoutes);
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
