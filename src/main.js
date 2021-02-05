const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const authRoutes = require('./routes/auth')
app.use('/auth/', authRoutes)

app.listen(3000)
