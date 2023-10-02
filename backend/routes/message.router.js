const express = require('express');
const router = express.Router();
const {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
} = require('../controllers/message.controller');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getMessages).post(protect, createMessage);
router.route('/:id').delete(protect, deleteMessage).put(protect, updateMessage);

module.exports = router;
