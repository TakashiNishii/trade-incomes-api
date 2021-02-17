const jwt = require('jsonwebtoken')

const User = require('../models/user')

const verifyAdmin = (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    return res.status(401).send({ error: 'not authorized' })
  }

  const token = bearer.split(' ')[1]

  jwt.verify(token, process.env.SECRET_KEY, async (gotError, user) => {
    if (gotError) {
      return res.status(401).send({ error: 'invalid jwt' })
    }

    const isAdmin = await User.findOne({
      email: user.email,
      admin: true
    }).lean()

    if (!isAdmin) {
      return res.status(403).send({ error: 'not authorized' })
    } else {
      next()
    }
  })
}

const verifyUser = (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    return res.status(401).send({ error: 'not authorized' })
  }

  const token = bearer.split(' ')[1]

  jwt.verify(token, process.env.SECRET_KEY, async (gotError, user) => {
    if (gotError) {
      return res.status(401).send({ error: 'invalid jwt' })
    }

    const isUser = await User.findOne({ email: user.email }).lean()

    if (!isUser) {
      return res.status(403).send({ error: 'not authorized' })
    } else {
      next()
    }
  })
}

module.exports = { verifyAdmin }
