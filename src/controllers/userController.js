const User = require('../models/user')
const jwt = require('jsonwebtoken')

const show = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY, async (_error, user) => {
        const userFinded = await User.findOne({ email: user.email })
        return res.json({ userFinded })
    })
}

module.exports = {
    show
}