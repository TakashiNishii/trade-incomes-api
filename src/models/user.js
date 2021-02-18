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

  cpf: {
    type: String,
    require: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  incomes: {
    amountInvested: {
      type: Number,
      default: 0
    },
    earnedValue: {
      type: Number,
      default: 0
    }
  },

  bankData: {
    pix: {
      type: String,
      default: ''
    },
    ted: {
      agency: {
        type: String,
        default: ''
      },
      account: {
        type: String,
        default: ''
      },
      bank: {
        type: Number,
        default: 0
      }
    }
  },

  admin: {
    type: Boolean,
    default: false
  },

  resetPassToken: {
    type: String,
    select: false
  },

  resetPassExp: {
    type: Date,
    select: false
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
