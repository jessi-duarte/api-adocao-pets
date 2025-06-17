const jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Token não fornecido.' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(403).json({ error: 'Token inválido.' })
  }
}

function verifyAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Acesso restrito a administradores.' })
    }
    next()
  })
}

module.exports = { verifyToken, verifyAdmin }