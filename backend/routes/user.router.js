const express = require('express');

const {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  forgetPassword,
  resetPassword,
  verifyEmail,
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/all', getAllUsers);
userRouter.get(':id', getSingleUser);
userRouter.get('/verifyEmail/:id', verifyEmail);
userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/forgetPassword', forgetPassword);
userRouter.post('/resetPassword/:id', resetPassword);

module.exports = userRouter;
