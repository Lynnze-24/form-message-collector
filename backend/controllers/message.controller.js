const asyncHandler = require('express-async-handler');

const Message = require('../models/messageModel');

// @desc    Get Messages
// @route   GET /api/messages
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ user: req.user.id });

  res.status(200).json(messages);
});

// @desc    Set Message
// @route   POST /api/messages
// @access  Private
const createMessage = asyncHandler(async (req, res) => {
  const { email, subject, messageBody } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('Email Required!');
  }

  if (!subject) {
    res.status(400);
    throw new Error('Subject Required!');
  }

  if (!messageBody) {
    res.status(400);
    throw new Error('Message Required!');
  }

  const message = await Message.create({
    user: req.user.id,
    email,
    subject,
    messageBody,
  });

  res.status(200).json(message);
});

// @desc    Update Message
// @route   PUT /api/messages/:id
// @access  Private
const updateMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(400);
    throw new Error('Message not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the message user
  if (message.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedMessage = await Message.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedMessage);
});

// @desc    Delete Message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(400);
    throw new Error('Message not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the Message user
  if (message.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  console.log(message);

  await message.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
};
