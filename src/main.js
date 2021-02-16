const express = require('express')
const { json, urlencoded } = require('body-parser')

require('dotenv').config()

const app = express()
const api = express()

app.use(json())
app.use(urlencoded({ extended: false }))

const authRoutes = require('./routes/auth')
const managerRoutes = require('./routes/manager')

app.use('/auth/', authRoutes)
app.use('', managerRoutes)

api.use('/api', app)

const server = api.listen(3000, () => {
  const { address, port } = server.address()

  console.log(`Server listening at http://${address}:${port}`)
})
