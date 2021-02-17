const { Router } = require('express')
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = Router()

router.get('/incomes', (req, res) => {
    
})

module.exports = router
