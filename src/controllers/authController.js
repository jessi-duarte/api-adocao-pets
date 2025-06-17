const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../config/database')

require('dotenv').config()

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body

    try {
      const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email])
      const user = users[0]

      if (!user) return res.status(400).json({ error: 'Usuário não encontrado.' })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(401).json({ error: 'Senha inválida.' })

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES || '1h' }
      )

      res.json({ token })
    } catch (err) {
      res.status(500).json({ error: 'Erro ao autenticar.' })
    }
  }
}

module.exports = AuthController