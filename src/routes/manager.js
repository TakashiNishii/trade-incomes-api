const { Router } = require('express')

const authMiddleware = require('../middlewares/authMiddleware')
const managerController = require('../controllers/admin/UserActionsController')

const router = Router()

router.delete(
  '/user',
  authMiddleware.verifyAdmin,
  managerController.userDelete
)

router.patch(
  '/user',
  authMiddleware.verifyAdmin,
  managerController.userPatch
)

router.get(
  '/user',
  authMiddleware.verifyAdmin,
  managerController.userIndex
)

router.put(
  '/incomes',
  authMiddleware.verifyAdmin,
  managerController.incomesPut
)

module.exports = router
