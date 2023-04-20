const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

const password = process.env.PASSWORD

router.post('/', (req,res)=>{
  const requestedPassword = req.body.password
  if(requestedPassword!=password){
    return res.json({message : 'incorrect password', signedIn : false})
  }
  const token = generateToken(process.env.USER)
  return res.header({auth:token}).json({message: 'logged in', token: token, signedIn : true, user:process.env.USER})
})

function generateToken(username){
  return jwt.sign({user: username}, process.env.PRIVATE_KEY, { expiresIn: 1200 })
}

module.exports = router

