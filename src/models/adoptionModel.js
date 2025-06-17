const db = require('../config/database')

class AdoptionModel {
  static async create(adoption) {
    const [result] = await db.query(
      'INSERT INTO adoptions (user_id, pet_id, adoption_date) VALUES (?, ?, ?)',
      [adoption.user_id, adoption.pet_id, adoption.adoption_date]
    )
    return result.insertId
  }

  static async findByUserAndPet(userId, petId) {
    const [rows] = await db.query(
      'SELECT * FROM adoptions WHERE user_id = ? AND pet_id = ?',
      [userId, petId]
    )
    return rows[0]
  }

  static async findAll() {
    const [rows] = await db.query(`
      SELECT a.id, u.name AS user, p.name AS pet, a.adoption_date
      FROM adoptions a
      JOIN users u ON a.user_id = u.id
      JOIN pets p ON a.pet_id = p.id
    `)
    return rows
  }
}

module.exports = AdoptionModel