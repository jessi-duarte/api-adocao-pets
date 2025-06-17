const express = require('express')
const UserController = require('../controllers/userController')
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/', UserController.create)
router.get('/', verifyAdmin, UserController.getAll)
router.get('/:id', verifyToken, UserController.getById)
router.put('/:id', verifyToken, UserController.update)
router.delete('/:id', verifyAdmin, UserController.delete)

module.exports = router