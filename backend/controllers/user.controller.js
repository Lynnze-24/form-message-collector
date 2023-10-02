const User = require('../models/userModel');
const Code = require('../models/codeModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { sendMail } = require('../utils/mailingService/mailingService');
const fs = require('fs');

// require.extensions['.html'] = function (module, filename) {
//   module.exports = fs.readFileSync(filename, 'utf8');
// };

// const verifyTemp = require('../utils/mailingService/htmlTemplates/resetPassword.js');

const {
  resetPasswordTemp,
} = require('../utils/mailingService/htmlTemplates/resetPassword.js');
const {
  verifyEmailTemp,
} = require('../utils/mailingService/htmlTemplates/verifyEmail.js');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports.getAllUsers = asyncHandler(async function (req, res) {
  const users = await User.find();
  res.json(users);
});

module.exports.getSingleUser = asyncHandler(async function (req, res) {
  const { id } = req.params;
  console.log(req.params);
  const user = await User.find({ _id: id });
  res.json(user);
});

module.exports.registerUser = asyncHandler(async function (req, res) {
  const { email, password } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('Email Required!');
  }
  if (!password) {
    res.status(400);
    throw new Error('Password Required!');
  }

  const userExists = await User.findOne({ email });

  // Check if user exists
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    email,
    password: hashedPassword,
    isVerified: false,
  });

  if (user) {
    await sendMail(
      email,
      'Email verification request',
      verifyEmailTemp(user.id)
    );
    res.status(201).send('sent verification email');
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

module.exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('Email Required!');
  }
  if (!password) {
    res.status(400);
    throw new Error('Password Required!');
  }

  // Check for user email
  const user = await User.findOne({ email });

  if (!user.isVerified) {
    res.status(400);
    throw new Error('Please verify your email to login!');
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

module.exports.forgetPassword = asyncHandler(async function (req, res) {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error('Email Required!');
  }

  const userExists = await User.findOne({ email });

  // Check if user exists
  if (!userExists) {
    res.status(400);
    throw new Error('User does not exist!');
  }

  const existingCode = await Code.findOne({ email });
  if (existingCode) {
    await Code.deleteOne({ email });
  }

  const createdCode = await Code.create({ email });

  await sendMail(
    email,
    'Email verification request',
    resetPasswordTemp(createdCode._id)
  );
  res.status(200).send('sent reset password email');
});

module.exports.resetPassword = asyncHandler(async function (req, res) {
  const codeId = req.params.id;
  const { password } = req.body;
  if (!codeId) {
    res.status(400);
    throw new Error('Params Required!');
  }

  const codeExists = await Code.findOne({ _id: codeId });

  if (!codeExists) {
    res.status(400);
    throw new Error('Reset link might be expired!');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const updatedUser = await User.findOneAndUpdate(
    { email: codeExists.email },
    {
      password: hashedPassword,
    },
    {
      new: true,
    }
  );

  if (!updatedUser && !updatedUser?.id) {
    res.status(500);
    throw new Error('Something went wrong!');
  }

  await codeExists.deleteOne();

  res.status(200).send('Reset password successful!');
});

module.exports.verifyEmail = asyncHandler(async function (req, res) {
  const userId = req.params.id;

  const user = await User.findOne({ _id: userId });

  // Check if user exists
  if (!user) {
    res.status(400);
    throw new Error('User does not exist!');
  }

  user.isVerified = true;
  await user.save();

  res.status(200).send('Email verified');
});
