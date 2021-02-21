const Fund = require('../../models/fund')
const User = require('../../models/user')
const { default: validator } = require('validator')

const insertFund = async (req, res) => {
  const { email, invested, gained } = req.body

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Email address is malformatted' })
  }

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const fund = await Fund.create({
      invested,
      gained,
      userOwner: user._id
    })

    return res.json({ fund })
  } catch (error) {
    return res.status(400).json({ error: 'Cannot insert funds' })
  }
}

module.exports = {
  insertFund
}
