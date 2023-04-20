const jwt = require('jsonwebtoken')
require('dotenv').config()

const responseObject = (error, ok, message)=> {
  return {
    error : error,
    message : message,
    ok : ok
  }
}

function validateToken (req,res,next) {
  const token = req.header('auth')
  if(!token) return res.json({message:'No se ha podido autenticar'})
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded)=>{
    if(err){
      return res.json({message:'Token de autenticacion expirado o invalido', loggedIn:false})
    }else{
      req.user = {}
      req.user.username = decoded.user
      console.log(decoded)
      next()
    }
  })
}

module.exports = {responseObject, validateToken}