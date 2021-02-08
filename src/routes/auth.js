const { Router } = require('express')
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post(
  '/register',
  authMiddleware.verifyAdmin,
  authController.userRegister
)
router.post('/login', authController.userLogin)

module.exports = router
