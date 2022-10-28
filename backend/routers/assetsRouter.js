const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const asset = require('../models/assets')

mongoose.connect('mongodb://127.0.0.1:27017/taxi')

router.get("/", async (req,res)=>{
  const assets = await asset.find({})
  res.send(JSON.stringify(assets))
})

module.exports = router