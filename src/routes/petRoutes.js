const express = require('express')
const PetController = require('../controllers/petController')
const { verifyAdmin } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/available', PetController.getAvailable)
router.get('/', verifyAdmin, PetController.getAll)
router.get('/:id', verifyAdmin, PetController.getById)
router.post('/', verifyAdmin, PetController.create)
router.put('/:id', verifyAdmin, PetController.update)
router.delete('/:id', verifyAdmin, PetController.delete)

module.exports = router