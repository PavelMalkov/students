require('dotenv').config()
const express = require('express')

const sequelize = require('./db')

const PORT = process.env.PORT || 8080

const app = express()

app.get('/', (req,res)=>{
    res.send("HELLO!")
})

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,()=>console.log(`Сервер запущен на порту ${PORT}`))
    }catch (e){
        console.log(e)
    }
}
start()
