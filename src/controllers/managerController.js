const { default: validator } = require('validator')
const User = require('../models/user')

const bcrypt = require('bcrypt')

const userPatch = async (req, res) => {
  const { email, newEmail, name, password } = req.body

  if (!validator.isEmail(email)) {
    return res.status(400).send({ error: 'Email is malformatted' })
  }

  if (newEmail && !validator.isEmail(newEmail)) {
    return res.status(400).send({ error: 'NewEmail is malformatted' })
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return res.status(404).json({ error: `User not found` })
  }
  try {
    let bcryptResult = null
    if (password) {
      bcryptResult = await bcrypt.hash(password, 8)
    }

    const userPatch = await User.findByIdAndUpdate(
      user.id,
      {
        $set: {
          email: newEmail || email,
          name: name || user.name,
          password: bcryptResult || user.password
        }
      },
      { useFindAndModify: false }
    )

    return res.json(userPatch)
  } catch (error) {
    return res.status(400).send({ error })
  }
}

const userDelete = async (req, res) => {
  const { email } = req.body

  if (!validator.isEmail(email)) {
    return res.status(400).send({ error: 'Email is malformatted' })
  }

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({ error: `User not found` })
  }

  try {
    await User.findOneAndDelete(
      { _id: user.id },
      { useFindAndModify: false }
    )
    return res.json({ message: 'User deleted' })
  } catch (error) {
    return res.status(400).send({ error: 'User cannot is deleted' })
  }
}

const userIndex = async (_req, res) => {
  const users = await User.find({ admin: false })

  if (!users) {
    return res.status(404).json({ message: 'Users not found' })
  }

  return res.json({ users })
}

const incomesPut = async (req, res) => {
  const { email, valueInvested, valueGain } = req.body

  if (!validator.isEmail(email)) {
    return res.status(400).send({ error: 'Email is malformatted' })
  }

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({ error: `User not found` })
  }

  try {
    const incomesUpdated = {
      incomes: {
        valueInvested,
        valueGain
      }
    }
    await User.findOneAndUpdate({ _id: user.id }, incomesUpdated, {
      useFindAndModify: false
    })
    return res.json({ message: 'User incomes updated' })
  } catch (error) {
    return res.status(400).send({ error: 'Cannot input incomes' })
  }
}

module.exports = {
  userPatch,
  userDelete,
  userIndex,
  incomesPut
}
