const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, 'Email Required!'],
    },
  },
  {
    timestamps: true,
  }
);

const Code = mongoose.model('Code', codeSchema);

module.exports = Code;
