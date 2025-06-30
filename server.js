const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

// Middlewares globais
app.use(express.json())
app.use(cors())
app.use(helmet())

// Importa e usa as rotas (conforme você colocou no app.js)
const authRoutes = require('./src/routes/authRoutes')
const userRoutes = require('./src/routes/userRoutes')
const petRoutes = require('./src/routes/petRoutes')
const adoptionRoutes = require('./src/routes/adoptionRoutes')

app.use('/', authRoutes)
app.use('/users', userRoutes)
app.use('/pets', petRoutes)
app.use('/adoptions', adoptionRoutes)

// Porta
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})