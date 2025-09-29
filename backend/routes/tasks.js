const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');
const { createTask, getTasks, updateTask } = require('../controllers/taskController');

router.post('/', auth, allowRoles('admin'), createTask);
router.get('/my', auth, getMyTasks); // User sees only their tasks
router.patch('/:id', auth, updateTask); // Update task status

module.exports = router;
