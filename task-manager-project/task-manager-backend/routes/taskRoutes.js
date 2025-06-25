const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Create Task
router.post("/tasks", authMiddleware, async (req, res) => {
  try {
    const { title } = req.body;
    const task = await Task.create({ title, userId: req.userId });
    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    console.error("❌ Error creating task:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get All Tasks
router.get("/tasks", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.userId } });
    res.json(tasks);
  } catch (err) {
    console.error("❌ Error fetching tasks:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update Task Status
router.put("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    task.status = status;
    await task.save();
    res.json({ message: "Status updated", task });
  } catch (err) {
    console.error("❌ Error updating task:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ DELETE Task
router.delete("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    await task.destroy();
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("❌ Error deleting task:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
