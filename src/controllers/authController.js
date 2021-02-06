const User = require('../models/user')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userRegister = async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 8, async (err, hashedPass) => {
      if (err) {
        console.log(err)
        return res.status(400).send({ error: 'register failed' })
      }
      const { name, email } = req.body
      const user = await User.create({ name, email, password: hashedPass })
      return res.send({ user })
    })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'register failed' })
  }
}

module.exports = { userRegister }
