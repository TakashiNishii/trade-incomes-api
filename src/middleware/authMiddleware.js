const jwt = require('jsonwebtoken')

const User = require('../models/user')

const verifyAdmin = (req, res, next) => {
  const bearer = req.headers.authorization
  if (bearer) {
    const token = bearer.split(' ')[1]
    jwt.verify(token, 'baguvix', async (err, user) => {
      if (err) return res.status(403).send({ error: 'invalid jwt' })

      if (user) {
        console.log(user)

        const isAdmin = await User.findOne({
          email: user.email,
          admin: true
        }).lean()

        if (!isAdmin) return res.status(403).send({ error: 'not authorized' })
        else next()
      }
    })
  } else {
    return res.status(403).send({ error: 'not authorized' })
  }
}

module.exports = { verifyAdmin }
