import Task from "../models/TaskModel.js";

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      status,
      priority,
      reminderAt,
      assignedTo,
    } = req.body;

    const task = new Task({
      title,
      description,
      dueDate,
      status,
      priority,
      reminderAt,
      assignedTo,
      createdBy: req.user._id,
    });

    await task.save();
    res.status(201).json({ message: "Task is created sucessfully", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
