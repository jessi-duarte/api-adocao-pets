const UserService = require('../services/userService')

class UserController {
  static async create(req, res) {
    try {
      const id = await UserService.createUser(req.body)
      res.status(201).json({ message: 'Usuário criado com sucesso', id })
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
      res.status(500).json({ error: 'Erro interno ao criar usuário' })
    }
  }


  static async getAll(req, res) {
    const users = await UserService.getAllUsers()
    res.json(users)
  }

  static async getById(req, res) {
    const user = await UserService.getUserById(req.params.id)
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' })
    res.json(user)
  }

  static async update(req, res) {
    const updated = await UserService.updateUser(req.params.id, req.body)
    if (!updated) return res.status(404).json({ error: 'Usuário não encontrado.' })
    res.json({ message: 'Atualizado com sucesso.' })
  }

  static async delete(req, res) {
    const deleted = await UserService.deleteUser(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Usuário não encontrado.' })
    res.json({ message: 'Removido com sucesso.' })
  }
}

module.exports = UserController