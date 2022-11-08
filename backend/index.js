const express = require('express')
const assets = require('./routers/assetsRouter')
const spends = require ('./routers/spendsRouter')
const bills = require ('./routers/billsRouter')

const app = express()
const port = 3000

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

app.use('/assets', assets)
app.use('/spends', spends)
app.use('/bills', bills)

app.listen(port, () => {
  console.log(`Server running...`)
})