const AdoptionService = require('../services/adoptionService')

class AdoptionController {
  static async create(req, res) {
    try {
      const userId = req.user.userId
      const { pet_id } = req.body
      const id = await AdoptionService.adoptPet(userId, pet_id)
      res.status(201).json({ message: 'Adoção registrada.', id })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async getAll(req, res) {
    const adoptions = await AdoptionService.getAllAdoptions()
    res.json(adoptions)
  }
}

module.exports = AdoptionController
