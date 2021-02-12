const mongoose = require('mongoose')

if (process.env.NODE_ENV === 'development') {
  mongoose.connect('mongodb://localhost/trade-incomes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
} else {
  mongoose.connect(
    'mongodb://pixel:thrasher123@geonosis.mongodb.umbler.com:41435/trade-incomes',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
}

mongoose.Promise = global.Promise

module.exports = mongoose
