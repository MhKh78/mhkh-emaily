const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: {
    type: String,
    unique: true,
    required: true
  },
  name: String
});

const User = mongoose.model('users', userSchema);

module.exports = User;
