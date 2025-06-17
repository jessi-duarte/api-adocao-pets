const authRoutes = require('./routes/authRoutes')
app.use('/', authRoutes)

const userRoutes = require('./routes/userRoutes')
app.use('/users', userRoutes)

const petRoutes = require('./routes/petRoutes')
app.use('/pets', petRoutes)

const adoptionRoutes = require('./routes/adoptionRoutes')
app.use('/adoptions', adoptionRoutes)