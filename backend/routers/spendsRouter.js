const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const responseObject = require('../utils/utils')
const {getAsset, updateRecoveryProgress} = require('./common')

const spend = require('../models/spends')

mongoose.connect('mongodb://127.0.0.1:27017/taxi') 

//get all of the spends
//AGREGAR PAGINATION PENDIENTE
router.get('/', async (req,res,next)=>{
console.log(req.query)
  try{
    res.json ( await spend.find({}).populate('asset','name -_id'))
  }catch(error){
    res.status(400).json(responseObject(error,false,"Error obteniendo todos los gastos"))
  }
})

//sort all spends by amount 
// router.get('/', async(req,res)=>{
//   try {
//     const spends = await spend.find().sort({amount:req.query.order}).populate('asset','name -_id')
//     res.json(spends)    
//   } catch (error) {
//     res.status(400).json(responseObject(error,false,"Error al filtrar los gastos por cantidad"))
//   }
// })

//get spends filtered by category
router.get('/category/:category', async (req,res,next)=>{
  try{
    res.json( await spend.find({category : req.params.category}).populate('asset', 'name -_id'))
  }catch(error){
    res.status(400).json(responseObject(error,false,"ha ocurrido un error al obtener los gastos por categoria"))
  }
})

//get spends filtered by amount
router.get('/betweenamount/:min-:max/', async(req,res, next)=>{
  const min = req.params.min
  const max = req.params.max
  try {
    const spends = await spend.find({amount:{$gte:min, $lte:max}}).populate('asset', 'name -_id')
    res.json(spends)    
  } catch (error) {
    res.status(400).json(responseObject(error,false,"Error obteniendo los gastos filtrados por cantidad"))
  }
})

//filter the spends starting from the provided date
router.get('/startingfromdate/:date', async (req,res) => {
  try{
    const spends = await spend.find({date: {$gte: new Date(req.params.date)}}).populate('asset', 'name -_id')
    res.json(spends)
  }catch(error){
    res.status(400).json(responseObject(error, false, "Error obteniendo los gastos filtrados por fecha"))
  }
})

//get all of the spends ordered by date 
router.get('/betweendates/:date1/:date2', async (req,res)=>{
  try{
    const spends = 
    await spend.find(
      {date: { $gte : new Date(req.params.date1) , $lte: new Date(req.params.date2) } }
    )
    .populate('asset')
    res.json(spends)
  } catch(error) {
    res.status(400).json(responseObject(error, false, "Error obteniendo los gastos filtrados por rango de fechas"))
  }
})

//get all the spends by one or more filter
router.get('/filter/', async (req,res)=>{
  const pipeline = []
  const {category, amount, date} = req.query
  if(category!=undefined) {
    pipeline.push({ $match: { category: category } })
  }
  if(amount!=undefined){
    const qty = parseInt(amount)
    pipeline.push({ $match: { amount: {$gte : qty} } })
  }
  if(date!=undefined){
    const dte = new Date (date)
    pipeline.push({ $match: { date: {$gte : dte} } })
  }
  const spends = []
  const results = spend.aggregate(pipeline)
  for await (const result of results) {
      spends.push(result)
  }
  res.json(spends)
})


router.post('/', saveSpend, getAsset, updateAsset, updateRecoveryProgress)

async function saveSpend(req,res,next){
  const {name, description, category, amount, assetId, payed} = req.body
  const date = new Date (req.body.date)
  if(
    name == undefined ||
    category == undefined ||
    amount == undefined  ||
    assetId == undefined ||
    payed == undefined ||
    date == undefined
    ){
    return res.status(500).json(responseObject(null, false, "Error al guardar. Revisa tus parametros."))
  }
  const spendData = new spend ({
    name : name,
    description : description,
    category : category,
    amount : amount,
    date : date,
    payed : payed,
    asset : mongoose.Types.ObjectId(assetId)
  })
  try{
    await spendData.save()
    res.data = spendData
    next()
  }catch(error){
    return res.status(500).json(responseObject(error,false,"Ha ocurrido un error"))
  }
}

async function updateAsset(req,res,next){
  const asset = res.asset
  const spend = res.data
  try{
    if(spend.payed){
      asset.realEarnings -= spend.amount
    }else{
      asset.earnings -= spend.amount
    }
    await asset.save()
    next()
  }catch(error){
    return res.status(500).json(responseObject(null, false, "Error al guardar. Revisa tus parametros."))
  }
}

module.exports = router