const mongoose = require('../db/main')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },

  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
