const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, status } = req.body;
    const task = await Task.create({ title, status, userId: req.userId });
    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    res.status(500).json({ message: "Create failed", error: err.message });
  }
};

exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.userId } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.userId } });

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = status;
    await task.save();
    res.json({ message: "Status updated", task });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};
