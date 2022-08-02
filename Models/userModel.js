const mongoose = require('mongoose');

const validator = require('validator');

//SCHEMA
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
    maxlength: [50, 'A tour name must have less or equal to 50 characters'],
    minlength: [3, 'A tour name must have more or equal than 3 characters'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email format'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'A user must provide a password'],
    trim: true,
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A user must confirm password'],
    trim: true,
  },
});

//MODAL
const User = mongoose.model('User', userSchema);

module.exports = User;
