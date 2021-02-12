const mongoose = require('mongoose')

if (process.env.NODE_ENV === 'development') {
  mongoose.connect('mongodb://localhost/trade-incomes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
} else {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
}

mongoose.Promise = global.Promise

module.exports = mongoose
