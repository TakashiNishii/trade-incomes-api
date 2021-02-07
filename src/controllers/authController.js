const User = require('../models/user')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userRegister = async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 8, async (err, hashedPass) => {
      if (err) {
        console.log(err)
        return res.status(400).send({
          error: 'register failed'
        })
      }
      const { name, email } = req.body
      const user = await User.create({
        name,
        email,
        password: hashedPass
      })
      return res.send({ user })
    })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'register failed' })
  }
}

const userLogin = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error(err)
          res.status(400).json({
            error: `Password don't match`
          })
        }

        if (result) {
          const token = jwt.sign({ email, password }, 'baguvix')
          res.status(200).json({ token })
        }
      })
    } else {
      throw new Error('fail')
    }
  } catch (err) {
    console.log(err)
    return res.status(400).send({
      error: 'login failed'
    })
  }
}

module.exports = {
  userRegister,
  userLogin
}
