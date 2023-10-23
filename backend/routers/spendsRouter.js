const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {responseObject} = require('../utils/utils')
const {getAsset, updateRecoveryProgress} = require('./common')

const spend = require('../models/spends')

//get all of the spends
//AGREGAR PAGINATION PENDIENTE
router.get('/', async (req,res,next)=>{
  try{
    res.json ( await spend.find({}).populate('asset','name -_id'))
  }catch(error){
    res.status(400).json(responseObject(error,false,"Error obteniendo todos los gastos"))
  }
})

router.get('/id/:id', getSpend, (req,res)=> res.json(res.data))

//get the last x number of spends
router.get('/last/:quantity', async(req,res)=>{
  const number = req.params.quantity
  try{
    const spends = await spend.find({}).sort({date:-1}).limit(number)
    res.json(spends)
  }catch(error){
    res.status(400).json(responseObject(error,false,"Error al filtrar los gastos"))
  }
})

//get all the spends by one or more filter
router.get('/filter', async (req,res)=>{
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

router.post("/filter", async (req,res)=>{
  const {category, amount, date} = req.body
  const pipeline = []
  if(!amount && !category && !date) {
    res.status(400).json(responseObject(null,false,"No hay filtros seleccionados"))
    return
  } 

  //date filter
  if(date && date.start) pipeline.push( { $match : { date: { $gte : new Date(date.start) , $lte: new Date(date.end) }} }) 
  if(date && date.after) pipeline.push( { $match :{date: { $gte : new Date(date.after) }}}) 
  if(date && date.before) pipeline.push( { $match :{date: { $lte : new Date(date.before) }}}) 

  //amount filter
  if(amount && amount.more) pipeline.push( { $match : { amount: { $gte : parseFloat(amount.more) }} }) 
  if(amount && amount.less) pipeline.push( { $match : { amount: { $lte : parseFloat(amount.less) }} })
  if(amount && amount.max) pipeline.push( { $match : { amount: { $gte : parseFloat(amount.min), $lte : parseFloat(amount.max) }} })

  //category filter
  if(category) pipeline.push( { $match : { category: category} }) 

  try{
    const result = await spend.aggregate(pipeline) 
    res.json(result)
  }catch(error){
    res.status(400).json(responseObject(null,false,"No se ha podido filtrar la información"))
    return
  }
})

//gets the results of a text search ordered by date
router.post('/search', async (req,res)=>{
  const searchQuery = req.body.query
  try{
    const results = await spend.aggregate().search(
      {
        index: 'spendsSearch',
        text : {
        query : searchQuery,
        path : ['name','description'],
        fuzzy : {}
      }}).sort({date:1})
    res.status(200).json(results)
  }catch(e){
    res.status(400).json(responseObject(e,false,"Error"))
  }
})

router.post('/', saveSpend, getAsset, updateAsset, updateRecoveryProgress)
router.delete('/id/:id', getSpend, getAsset, deleteSpend, updateRecoveryProgress)
router.put('/id/:id', getSpend, getAsset, editSpend, updateRecoveryProgress)


async function getSpend(req,res,next){
  try{
    const selectedSpend = await spend.findById(req.params.id).populate('asset', 'name')
    res.data = selectedSpend
    next()
  }catch(error){
    return res.status(500).json(responseObject(error,false, "no existe el gasto que estas buscando."))
  }
}

async function deleteSpend(req,res,next){
  const spendID = req.params.id
  const asset = res.asset
  const amount = res.data.amount
  try{
    await spend.deleteOne({_id:spendID})
    if(res.data.payed){
      asset.realEarnings += amount
    }else{
      asset.earnings += amount
    }
    await asset.save()
    next()
  }catch(error){
    return res.status(500).json(responseObject(error,false,"no se ha podido eliminar"))
  }
}

async function editSpend(req,res,next){
  const asset = res.asset
  const selectedSpend = res.data
  const previousAmount = selectedSpend.amount
  const previousPayed = selectedSpend.payed
  const {name,description,category,amount,payed,date} = req.body

  try{
    if(name) selectedSpend.name = name
    if(description) selectedSpend.description = description
    if(category) selectedSpend.category = category
    if(date) selectedSpend.date = date
    if(payed!=undefined) selectedSpend.payed = payed
    if(amount) selectedSpend.amount = amount
    await selectedSpend.save()
  }catch(error){
    return res.status(500).json(responseObject(error,false,"no se ha podido actualizar el gasto"))
  }

  try{
    //if payed was false and has changed to true
    if(previousPayed!=selectedSpend.payed && selectedSpend.payed){
      asset.earnings += previousAmount
      asset.realEarnings -= selectedSpend.amount
    }

    //if payed was true and has changed to false
    if(previousPayed!=selectedSpend.payed && !selectedSpend.payed){
      asset.realEarnings += previousAmount
      asset.earnings -= selectedSpend.amount
    }

    //if payed stays the same and its true
    if(previousPayed===selectedSpend.payed && selectedSpend.payed){
      asset.realEarnings += previousAmount
      asset.realEarnings -= selectedSpend.amount
    }

    //if payed stays the same and its false
    if(previousPayed===selectedSpend.payed && !selectedSpend.payed){
      asset.earnings += previousAmount
      asset.earnings -= selectedSpend.amount
    }
    await asset.save()
    next()
  }catch(error){
    return res.status(500).json(responseObject(error,false,"no se ha podido actualizar el activo"))
  }
}

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