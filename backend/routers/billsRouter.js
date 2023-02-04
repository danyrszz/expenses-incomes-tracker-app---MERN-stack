const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bill = require('../models/bills')
const responseObject = require('../utils/utils')
mongoose.connect('mongodb://127.0.0.1:27017/taxi')

const {getAsset, updateRecoveryProgress} = require('./common')

//get all bills
router.get('/', async (req,res)=>{
  try{
    const bills = await bill.find().populate('asset', 'name -_id')
    res.json(bills)
  }catch(error){
    res.status(400).json(responseObject(error,false,"Error al solicitar las cuentas"))
  }
})

//get bills between dates
router.get('/betweendates/:date1/:date2', async (req,res)=>{
  const date1 = req.params.date1
  const date2 = req.params.date2
  try{
    const bills = await bill.find(
      {date: { $gte : new Date(req.params.date1) , $lte: new Date(req.params.date2) } }
    )
    res.json(bills)
  }catch(error){
    res.status(400).json(responseObject(error,false,"error al intentar filtrar las cuentas por fechas"))
  }
})

//get bills starting from date to now
router.get('/startingfromdate/:date', async (req,res) => {
  try{
    const bills = await bill.find({date: {$gte: new Date(req.params.date)}})
    res.json(bills)
  }catch(error){
    res.status(400).json(responseObject(error, false, "Error al intentar obtener las cuentas desde una fecha en especifico. Revisa tus parametros."))
  }
})

//get bills greater than and less than
router.get('/betweenamount/:min-:max/', async(req,res, next)=>{
  const min = req.params.min
  const max = req.params.max
  try{
    const bills = await bill.find({amount:{$gte:min, $lte:max}})
    res.json(bills)
  }catch(error){
    res.status(400).json(responseObject(error,false,"Error al obtener cuentas por cantidad"))
  }
})

//save a new bill
router.post("/", saveBill, getAsset, updateAsset, updateRecoveryProgress)

//update an existent bill
router.put("/:id/", getBill, getAsset, updateBill, updateRecoveryProgress)

//delete an existent bill
router.delete("/:id", getBill, getAsset, deleteBill, updateRecoveryProgress)

async function saveBill(req,res,next){
  const {amount, date, assetId} = req.body
  if(
    amount == undefined ||
    date == undefined ||
    assetId == undefined 
    ){
    return res.status(400).json(responseObject(null, false, "Error al guardar. Revisa tus parametros."))
  }
  const currentBill = new bill({
    amount : amount,
    date : new Date ( date ),
    asset : mongoose.Types.ObjectId(assetId)
  })
  try{
    await currentBill.save()
    res.data = currentBill
    next()
  }catch(error){
    res.status(500).json(responseObject(error,false,"Ha ocurrido un error"))
  }
}
//after inserting a new bill
async function updateAsset(req,res,next){
  const asset = res.asset
  const amount = res.data.amount
  try{
    asset.totalIncomes += amount
    asset.earnings += amount
    asset.realEarnings += amount
    await asset.save()
    next()
  }catch(error){
    res.status(500).json(responseObject(error,false,"error al guardar"))
  }
}

async function getBill(req,res,next){
  try{
    const selectedBill = await bill.findById(req.params.id).populate('asset', 'name')
    res.data = selectedBill
    next()
  }catch(error){
    return res.status(500).json(responseObject(error,false, "error obteniendo la cuenta"))
  }
}

async function updateBill(req,res,next){
  const asset = res.asset
  const bill = res.data
  try{
    asset.totalIncomes -= bill.amount
    asset.realEarnings -= bill.amount
    asset.earnings -= bill.amount
    await res.asset.save() 
  }catch(error){
    return res.status(400).json("error al intentar actualizar el activo")
  }
  const {date,amount} = req.body
  if(amount) bill.amount = amount
  if(date) bill.date = date
  try{
    asset.totalIncomes += bill.amount
    asset.realEarnings += bill.amount
    asset.earnings += bill.amount
    await bill.save()
    await asset.save()
    next()
  }catch(error){
    return res.status(500).json(responseObject(error,false,"ha ocurrido un error al actualizar la informacion"))
  }
}

async function deleteBill(req,res,next){
  const billId = req.params.id
  const asset = res.asset
  const amount = res.data.amount
  try{
    await bill.deleteOne({_id:billId})
    asset.realEarnings -= amount
    asset.earnings -= amount
    asset.totalIncomes -= amount
    await asset.save()
    next()
  }catch(error){
    return res.status(500).json(responseObject(error,false,"no se ha podido eliminar"))
  }
}

module.exports = router