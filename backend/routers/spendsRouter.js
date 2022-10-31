const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const spend = require('../models/spends')
const asset = require('../models/assets')

const errorObject = (error)=> {
  return {
    error : error,
    message : "Error al realizar la consulta. Revisa tus parametros.",
    ok : false
  }
}

mongoose.connect('mongodb://127.0.0.1:27017/taxi')

//get all of the spends
router.get('/', async (req,res,next)=>{
  if(req.query.order===undefined){
    res.json ( await spend.find({}).populate('asset'))
  }else{
    next()
  }
})

//sort all spends by amount 
router.get('/', async(req,res)=>{
  const spends = await spend.find().sort({amount:req.query.order})
  res.json(spends)
})

//get spends filtered by category
router.get('/category/:category', async (req,res)=>{
  res.json( await spend.find({category : req.params.category}).populate('asset'))
})

//get spends filtered by amount
router.get('/betweenamount/:min-:max/', async(req,res, next)=>{
  const min = req.params.min
  const max = req.params.max
  const spends = await spend.find({amount:{$gte:min, $lte:max}}).populate('asset')
  console.log(req.query.sort)
  res.json(spends)
})

//sort spends filtered by amount

//filter the spends starting from the provided date
router.get('/startingfromdate/:date', async (req,res) => {
  try{
    const spends = await spend.find({date: {$gte: new Date(req.params.date)}}).populate('asset')
    res.json(spends)
  }catch(error){
    res.status(400).json(errorObject(error))
  }
})

//get all of the spends ordered by date 
router.get('/betweendates/:date1/:date2', async (req,res)=>{
  try{
    const spends = await 
    spend.find(
      {date: { $gte : new Date(req.params.date1) , $lte: new Date(req.params.date2) } }
    )
    .populate('asset')
    res.json(spends)
  } catch(error) {
    res.status(400).json(errorObject(error))
  }
})

router.post('/', async (req,res)=>{
  const {name, description, category, amount, assetId, payed} = req.body
  const date = new Date (req.body.date)
  const data = new spend ({
    _id : mongoose.Types.ObjectId(),
    name : name,
    description : description,
    category : category,
    amount : amount,
    date : date,
    payed : payed,
    assetId : mongoose.Types.ObjectId(assetId)
  })
  const currentAsset = await asset.find({id:assetId})
  res.json("ok")
  try{
    await data.save()
    if(payed){
      const updatedAsset = await asset.findOneAndUpdate(
        {id:assetId},
        {
        totalIncomes : currentAsset[0].totalIncomes + amount,
        realEarnings : currentAsset[0].realEarnings - amount,
        }, 
        {new : true})
      if(updatedAsset.realEarnings<0){
        await asset.findOneAndUpdate(
          {id:assetId},
          {investmentRecoveryProgress : 100-(((updatedAsset.realEarnings*100)*-1)/currentAsset[0].assetCost)
        })      
      }
    }else{
      await asset.findOneAndUpdate({id:assetId},{
        totalIncomes : currentAsset[0].totalIncomes + amount,
        earnings : currentAsset[0].earnings - amount,
      })
    }
    res.json("Informacion actualizada correctamente")
  }catch(e){
      res.json(errorObject(e))
  }
})


module.exports = router