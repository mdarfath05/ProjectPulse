const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

// Only admin can list/delete users
router.get('/', auth, allowRoles('admin'), getAllUsers);
router.get('/:id', auth, allowRoles('admin'), getUserById);
router.delete('/:id', auth, allowRoles('admin'), deleteUser);

module.exports = router;
