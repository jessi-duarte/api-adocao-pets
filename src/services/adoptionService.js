const AdoptionModel = require('../models/adoptionModel')
const PetService = require('./petService')

class AdoptionService {
  static async adoptPet(userId, petId) {
    const existing = await AdoptionModel.findByUserAndPet(userId, petId)
    if (existing) throw new Error('Pet já adotado por este usuário.')

    const pet = await PetService.getPetById(petId)
    if (!pet || pet.status !== 'available') throw new Error('Pet não disponível.')

    const adoption = {
      user_id: userId,
      pet_id: petId,
      adoption_date: new Date()
    }

    const id = await AdoptionModel.create(adoption)
    await PetService.markAsAdopted(petId)
    return id
  }

  static async getAllAdoptions() {
    return await AdoptionModel.findAll()
  }
}

module.exports = AdoptionService