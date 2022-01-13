const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  dateType: {
    type: Date,
    required: true,
  },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
