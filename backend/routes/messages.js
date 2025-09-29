const express = require('express');
const router = express.Router();
const { createMessage, getMyMessages } = require('../controllers/messageController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createMessage);
router.get('/me', auth, getMyMessages);

module.exports = router;
