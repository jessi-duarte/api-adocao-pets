const PetModel = require('../models/petModel')

class PetService {
  static async createPet(pet) {
    return await PetModel.create(pet)
  }

  static async getAllPets() {
    return await PetModel.findAll()
  }

  static async getAvailablePets() {
    return await PetModel.findAvailable()
  }

  static async getPetById(id) {
    return await PetModel.findById(id)
  }

  static async updatePet(id, pet) {
    return await PetModel.update(id, pet)
  }

  static async deletePet(id) {
    return await PetModel.delete(id)
  }

  static async markAsAdopted(id) {
    return await PetModel.updateStatus(id, 'adopted')
  }
}

module.exports = PetService