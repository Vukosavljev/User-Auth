const mongoose = require('../mongoose');
const listSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  postNumber: {
    type: Number,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  }
});

module.exports = mongoose.model('Users', listSchema);