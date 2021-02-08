const jwt = require('jsonwebtoken')

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  console.info(token)
  next()
}

module.exports = { verifyAdmin }
