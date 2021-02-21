const User = require('../../models/user')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const show = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY)

    const userFinded = await User.findOne({ email: user.email }).lean()

    if (!userFinded) {
      return res.status(404).json({ error: 'Got error at user load' })
    }

    return res.json({ data: userFinded })
  } catch (error) {
    return res.status(400).json({ error })
  }
}
const changePassword = async (req, res) => {
  const { email, newPassword, oldPassword } = req.body

  try {
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(404).json({ error: 'Got error at user load' })
    }

    const match = await bcrypt.compare(oldPassword, user.password)

    if (!match) {
      return res.status(406).json({ error: `Password don't match` })
    }

    const hashedPass = await bcrypt.hash(newPassword, 8)

    const update = { password: hashedPass }

    const result = await User.updateOne({ email }, update)

    if (result) {
      return res.json({ message: 'Password updated' })
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Cannot update the user password' })
  }
}

module.exports = {
  show,
  changePassword
}
