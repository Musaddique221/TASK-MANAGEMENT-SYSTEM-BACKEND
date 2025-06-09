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

const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find({});
    if (!tasks) return res.status(404).json({ message: "Tasks not found" });
    res.status(201).json({ message: "Fetched all tasks", tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const tasks = await Task.find({ assignedTo: id });

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    res.status(201).json({ message: "Tasks fetched successfully", tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTaskByUser = async (req, res) => {
  console.log(req.body, "60");
  try {
    const { status, taskId } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = status || task.status;
    await task.save();
    res.status(201).json({ message: "Task updated successfully", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editTaskByAdmin = async (req, res) => {
    console.log(req.body, "76")
  try {
    const {
      title,
      description,
      priority,
      status,
      dueDate,
      reminderAt,
      taskId,
    } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = title || task.title;
    task.description = description || task.description;
    task.priority = priority || task.priority;
    task.status = status || task.status;

    task.dueDate = dueDate || task.dueDate;
    task.reminderAt = reminderAt || task.reminderAt;

    await task.save();
    res.status(201).json({ message: "Task is edited", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTaskByAdmin = async (req, res) => {
  try {
    const { taskId } = req.body;
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(201).json({ message: "Task is deleted", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export {
  createTask,
  getAllTask,
  getTaskById,
  updateTaskByUser,
  editTaskByAdmin,
  deleteTaskByAdmin
};
