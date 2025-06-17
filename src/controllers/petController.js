const PetService = require('../services/petService')

class PetController {
  static async create(req, res) {
    try {
      const id = await PetService.createPet(req.body)
      res.status(201).json({ message: 'Pet criado com sucesso.', id })
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar pet.' })
    }
  }

  static async getAll(req, res) {
    const pets = await PetService.getAllPets()
    res.json(pets)
  }

  static async getAvailable(req, res) {
    const pets = await PetService.getAvailablePets()
    res.json(pets)
  }

  static async getById(req, res) {
    const pet = await PetService.getPetById(req.params.id)
    if (!pet) return res.status(404).json({ error: 'Pet não encontrado.' })
    res.json(pet)
  }

  static async update(req, res) {
    const updated = await PetService.updatePet(req.params.id, req.body)
    if (!updated) return res.status(404).json({ error: 'Pet não encontrado ou status inválido.' })
    res.json({ message: 'Pet atualizado.' })
  }

  static async delete(req, res) {
    const deleted = await PetService.deletePet(req.params.id)
    if (!deleted) return res.status(400).json({ error: 'Pet não pode ser removido.' })
    res.json({ message: 'Pet removido.' })
  }
}

module.exports = PetController