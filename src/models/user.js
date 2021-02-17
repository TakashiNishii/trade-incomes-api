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
    required: true,
    select: false
  },

  admin: {
    type: Boolean,
    default: false
  },

  resetPassToken: {
    type: String,
    select: false
  },

  incomes: {
    valueInvested: {
      type: Number,
      default: 0
    },
    valueGain: {
      type: Number,
      default: 0
    }
  },

  resetPassExp: {
    type: Date,
    select: false
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
