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
      // TODO: verificar registros duplicados
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
      const match = await bcrypt.compare(password, user.password)

      if (match) {
        const token = jwt.sign(
          { email, password, admin: user.admin },
          'baguvix'
        )
        res.status(200).json({ token })
      } else {
        res.status(400).json({
          error: `Password don't match`
        })
      }
    } else {
      res.status(400).json({
        error: `User not found`
      })
    }
  } catch (error) {
    return res.status(400).send({ error })
  }
}

module.exports = {
  userRegister,
  userLogin
}
