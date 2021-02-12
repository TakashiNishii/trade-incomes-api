const mongoose = require('mongoose')

mongoose.connect(
  'mongodb+srv://admin:admin@trade-incomes.va36r.mongodb.net/tradeincomes?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
)

mongoose.Promise = global.Promise

module.exports = mongoose
