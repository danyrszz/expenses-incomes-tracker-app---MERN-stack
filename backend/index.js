require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const assets = require('./routers/assetsRouter')
const spends = require ('./routers/spendsRouter')
const bills = require ('./routers/billsRouter')
const login = require ('./routers/loginRouter')
const {validateToken} = require('./utils/utils')

const app = express()
const port = process.env.PORT || 3000

const db = process.env.DB_CONNECTION
//const db = "mongodb://localhost:27017"
mongoose.connect(db, {dbName : 'taxi'})

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.use('/login', login)
app.post('/checkLogin', validateToken, (req,res)=> res.json({message:'usuario conectado', loggedIn:true, user: req.user.username}))

app.use('/assets', assets)
app.use('/spends', spends)
app.use('/bills', bills)

app.listen(port, () => {
  console.log(`Server running...`)
})