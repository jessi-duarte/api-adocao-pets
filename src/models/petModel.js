const db = require('../config/database')

class PetModel {
  static async create(pet) {
    const [result] = await db.query(
      `INSERT INTO pets (name, age, species, size, status, description) VALUES (?, ?, ?, ?, ?, ?)`,
      [pet.name, pet.age, pet.species, pet.size, pet.status || 'available', pet.description]
    )
    return result.insertId
  }

  static async findAll() {
    const [rows] = await db.query('SELECT * FROM pets')
    return rows
  }

  static async findAvailable() {
    const [rows] = await db.query('SELECT * FROM pets WHERE status = "available"')
    return rows
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM pets WHERE id = ?', [id])
    return rows[0]
  }

  static async update(id, pet) {
    const [result] = await db.query(
      `UPDATE pets SET name = ?, age = ?, species = ?, size = ?, description = ? WHERE id = ?`,
      [pet.name, pet.age, pet.species, pet.size, pet.description, id]
    )
    return result.affectedRows
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM pets WHERE id = ? AND status = "available"', [id])
    return result.affectedRows
  }

  static async updateStatus(id, status) {
    const [result] = await db.query('UPDATE pets SET status = ? WHERE id = ?', [status, id])
    return result.affectedRows
  }
}

module.exports = PetModel