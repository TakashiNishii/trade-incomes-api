const User = require('../models/user')

const userRegister = async (req, res) => {
  try {
    console.log(req.body)
    const user = await User.create(req.body)
    return res.send({ user })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'register failed' })
  }
}

module.exports = { userRegister }
