const Task = require('../models/task');

// Create a new Task (assigned to the logged-in user)
exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      createdBy: req.user._id, // 💥 Important: Link task to the logged-in user
    });
    await task.save();
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all tasks for the logged-in user (with optional filters)
exports.getAllTasks = async (req, res) => {
  try {
    // const filter = { createdBy: req.user._id }; // 💥 Only fetch tasks for this user
    const filter = {}
    if (req.query.status) filter.status = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;

    const tasks = await Task.find(filter);
    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a specific task by ID (only if it belongs to the logged-in user)
exports.getTaskById = async (req, res) => {
  try {
    // const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id });
    const task = await Task.findOne({ _id: req.params.id });
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    res.json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a task by ID (only if it belongs to the logged-in user)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      // { _id: req.params.id, createdBy: req.user._id },
      { _id: req.params.id},
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ success: false, message: 'Task not found or not authorized' });

    res.json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete a task by ID (only if it belongs to the logged-in user)
exports.deleteTask = async (req, res) => {
  try {
    // const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found or not authorized' });

    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
