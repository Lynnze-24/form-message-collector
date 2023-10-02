const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    email: {
      type: String,
      require: [true, 'Email Required!'],
    },
    subject: {
      type: String,
      require: [true, 'Subject Required!'],
    },
    messageBody: {
      type: String,
      require: [true, 'Message Required!'],
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
