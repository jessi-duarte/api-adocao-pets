const express = require('express')
const AdoptionController = require('../controllers/adoptionController')
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', verifyAdmin, AdoptionController.getAll)
router.post('/', verifyToken, AdoptionController.create)

module.exports = router