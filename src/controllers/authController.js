const User = require('../models/user')

const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const mailer = require('../modules/mail')

const userRegister = async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 8, async (gotError, hashedPass) => {
      if (gotError) {
        return res.status(400).send({
          error: 'register failed'
        })
      }
      const { name, email } = req.body
      const findedUser = await User.findOne({ email }).lean()

      if (findedUser) {
        return res.status(400).send({ error: 'User already registered' })
      }

      if (!validator.isEmail(email)) {
        return res.status(400).send({ error: 'Email is malformatted' })
      }

      const user = await User.create({
        name,
        email,
        password: hashedPass
      })
      return res.send({ user })
    })
  } catch (err) {
    return res.status(400).send({ error: 'register failed' })
  }
}

const userLogin = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      res.status(404).json({ error: `User not found` })
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      res.status(406).json({ error: `Password don't match` })
    }

    const token = jwt.sign(
      { email, password, admin: user.admin },
      process.env.SECRET_KEY
    )
    res.status(200).json({ token })
  } catch (error) {
    return res.status(400).send({ error })
  }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      res.status(404).json({ error: `User not found` })
    }

    const token = crypto.randomBytes(20).toString('hex')
    const now = new Date()
    now.setHours(now.getHours() + 1)

    await User.findByIdAndUpdate(
      user.id,
      {
        $set: {
          resetPassToken: token,
          resetPassExp: now
        }
      },
      { useFindAndModify: false }
    )
    // TODO: EMAIL CHECK => registration and so on
    mailer.sendMail(
      {
        to: 'leaxviana140@gmail.com',
        from: 'leandrovianacodes@gmail.com',
        template: 'forgot',
        context: { token }
      },
      err => {
        if (err) {
          return res
            .status(400)
            .send({ error: 'Cannot send forgot email to user`s email' })
        }

        return res.status(200).send()
      }
    )
  } catch (error) {
    return res.status(400).send({ error })
  }
}

module.exports = {
  userRegister,
  userLogin,
  forgotPassword
}
