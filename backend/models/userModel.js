const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, 'Email Required!'],
    },
    password: {
      type: String,
      require: [true, 'Password Required!'],
    },
    isVerified: {
      type: Boolean,
      require: [true, ' Required!'],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
