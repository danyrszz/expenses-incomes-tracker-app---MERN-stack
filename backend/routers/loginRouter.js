const express = require('express')
const router = express.Router()
const user = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
require('dotenv').config()

//const password = process.env.PASSWORD

router.post('/', async (req,res)=>{
  const password = await user.find({user : "danyrszz"})
  const hash = password[0].password
  const requestedPassword = req.body.password

  bcrypt.compare( requestedPassword, hash, 
    async function (err, match){
      if(match){
        const token = generateToken("danyrszz")
        return res.header({auth:token}).json({message: 'logged in', token: token, signedIn : true, user:"danyrszz"})
      }
      if(!match){
        return res.json({message : 'incorrect password', signedIn : false})
      }
    }
  )
})

function generateToken(username){
  return jwt.sign({user: username}, process.env.PRIVATE_KEY)
  // return jwt.sign({user: username}, process.env.PRIVATE_KEY, { expiresIn: 1200 })
}

module.exports = router

