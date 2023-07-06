require('dotenv').config()
const express = require('express')
const router = express.Router()
const asset = require('../models/assets')


router.get("/", async (req,res)=>{
  const assets = await asset.find({})
  res.json(assets)
})

module.exports = router