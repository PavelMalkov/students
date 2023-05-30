require('dotenv').config()
const express = require('express')
const sequelize = require('./db')

const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const router = require('./routes')

const cors = require('cors')

const PORT = process.env.PORT || 8080

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)


//в конец
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()
