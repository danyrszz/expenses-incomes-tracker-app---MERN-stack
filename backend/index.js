const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000


mongoose.connect('mongodb://127.0.0.1:27017/taxi')

app.get('/', (req, res) => {
  res.send('Hello sss!')
})

app.get('/api', (req,res)=>{
  res.send("API")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})