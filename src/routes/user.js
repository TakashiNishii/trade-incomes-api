const { Router } = require('express')
const userController = require('../controllers/user/UserActionsController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = Router()

router.get('/profile', authMiddleware.verifyUser, userController.show)
router.put(
  '/change-password',
  authMiddleware.verifyUser,
  userController.changePassword
)

module.exports = router
