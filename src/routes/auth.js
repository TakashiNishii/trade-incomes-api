const { Router } = require('express')
const authController = require('../controllers/authController')

const router = Router()

router.post('/register', authController.userRegister)
router.post('/login', authController.userLogin)

module.exports = router
