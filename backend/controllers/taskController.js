const Task = require('../models/Task');
const Project = require('../models/Project');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, project, dueDate } = req.body;
    const task = await Task.create({
      title,
      description,
      assignedTo,
      project,
      dueDate,
      status: 'pending',
      statusHistory: [{ status: 'pending', updatedAt: new Date() }]
    });

    // Add task to project
    const proj = await Project.findById(project);
    proj.tasks.push(task._id);
    await proj.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Update Task Status
exports.updateTask = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    task.status = status;
    task.statusHistory.push({ status, updatedAt: new Date() }); // save history
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Get My Tasks
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id }).populate('project', 'title');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
