import cron from "node-cron";
import Task from "../models/TaskModel.js";
import User from "../models/UserModel.js";
import { sendReminderEmail } from "../utils/mail.js";
import dayjs from "dayjs";

export const startReminderScheduler = () => {
  cron.schedule("*/5 * * * *", async () => {
    const now = new Date();
    const inOneHour = dayjs(now).add(1, "hour").toDate();

    try {
      const tasks = await Task.find({
        reminderAt: { $lte: inOneHour, $gte: now },
        status: { $ne: "completed" },
      }).populate("assignedTo");

      for (const task of tasks) {
        if (task.assignedTo?.email) {
          await sendReminderEmail(
            task.assignedTo.email,
            `Reminder: ${task.title}`,
            `Hi ${task.assignedTo.name},\n\nThis is a reminder for your task "${
              task.title
            }" which is due on ${dayjs(task.dueDate).format(
              "YYYY-MM-DD"
            )}.\n\nRegards,\nTask Manager`
          );
        }
      }
    } catch (err) {
      console.error("Error checking tasks for reminders:", err.message);
    }
  });
};
