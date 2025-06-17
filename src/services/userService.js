const UserModel = require('../models/userModel')

class UserService {
  static async createUser(user) {
    return await UserModel.create(user)
  }

  static async getUserById(id) {
    return await UserModel.findById(id)
  }

  static async getAllUsers() {
    return await UserModel.findAll()
  }

  static async updateUser(id, user) {
    return await UserModel.update(id, user)
  }

  static async deleteUser(id) {
    return await UserModel.delete(id)
  }
}

module.exports = UserService