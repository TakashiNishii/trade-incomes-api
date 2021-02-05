const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/trade-incomes', { useMongoClient: true })

mongoose.Promise = global.Promise

module.exports = mongoose