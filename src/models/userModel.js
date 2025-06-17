const db = require('../config/database')
const bcrypt = require('bcryptjs')

class UserModel {
  static async create(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
      [user.name, user.email, hashedPassword, user.phone, user.role || 'adopter']
    )
    return result.insertId
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT id, name, email, phone, role FROM users WHERE id = ?', [id])
    return rows[0]
  }

  static async findAll() {
    const [rows] = await db.query('SELECT id, name, email, phone, role FROM users')
    return rows
  }

  static async update(id, user) {
    const [result] = await db.query(
      'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?',
      [user.name, user.email, user.phone, id]
    )
    return result.affectedRows
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id])
    return result.affectedRows
  }
}

module.exports = UserModel