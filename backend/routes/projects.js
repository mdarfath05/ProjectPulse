const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');
const { getProjects, createProject } = require('../controllers/projectController');
const { createTask, getMyTasks, updateTask } = require('../controllers/taskController');

const Project = require('../models/Project');  // <-- add this
const Task = require('../models/Task');        // <-- add this

// Projects
router.get('/', auth, allowRoles('admin'), getProjects);
router.post('/', auth, allowRoles('admin'), createProject);

// Tasks
router.post('/tasks', auth, allowRoles('admin'), createTask);       // create task
router.get('/tasks/me', auth, getMyTasks);                         // get user tasks
router.put('/tasks/:id', auth, updateTask);                        // update task

// DELETE project + tasks
router.delete('/:id', auth, allowRoles('admin'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    // Delete all tasks belonging to this project
    await Task.deleteMany({ project: project._id });

    // Delete the project
    await project.deleteOne();

    res.json({ msg: 'Project and its tasks deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
