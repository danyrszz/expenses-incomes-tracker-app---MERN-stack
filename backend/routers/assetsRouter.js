const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const asset = require('../models/assets')
const {validateToken} = require('../utils/utils')
require('dotenv').config()
const db = process.env.DB_CONNECTION

mongoose.connect(db)

router.get("/", async (req,res)=>{
  const assets = await asset.find({})
  res.json(assets)
})

module.exports = router