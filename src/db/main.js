const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/trade-incomes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

mongoose.Promise = global.Promise

module.exports = mongoose
