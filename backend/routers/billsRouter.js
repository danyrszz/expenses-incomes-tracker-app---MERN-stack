const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bill = require('../models/bills')
const asset = require('../models/assets')
const responseObject = require('../utils/utils')
mongoose.connect('mongodb://127.0.0.1:27017/taxi')

//get all bills
router.get('/', async (req,res)=>{
  const bills = await bill.find().populate('asset', 'name -_id')
  res.json(bills)
})

//save a new bill
router.post('/', saveBill, getAsset, updateAsset, updateRecoveryProgress)

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
    return res.status(500).json(responseObject(null, false, "Error al guardar. Revisa tus parametros."))
  }
  const currentBill = new bill({
    _id : mongoose.Types.ObjectId(),
    amount : amount,
    date : new Date ( date ),
    asset : mongoose.Types.ObjectId(assetId)
  })
  try{
    await currentBill.save()
    res.currentBill = currentBill
    next()
  }catch(error){
    res.json(responseObject(error,false,"Ha ocurrido un error"))
  }
}
//after inserting a new bill
async function updateAsset(req,res,next){
  const asset = res.asset
  const amount = res.currentBill.amount
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

async function getAsset(req,res,next){
  try{
    const selectedAsset = await asset.findById(res.currentBill.asset)
    if(!selectedAsset){
      return res.status(404).json(responseObject(error,false,"no existe el activo"))
    }
    res.asset = selectedAsset
    next()
  }catch(error){
    return res.status(500).json(responseObject(error,false, "error obteniendo el activo"))
  }
}

async function getBill(req,res,next){
  try{
    const selectedBill = await bill.findById(req.params.id).populate('asset', 'name')
    res.currentBill = selectedBill
    next()
  }catch(error){
    return res.status(500).json(responseObject(error,false, "error obteniendo la cuenta"))
  }
}

async function updateBill(req,res,next){
  try{
    res.asset.totalIncomes -= res.currentBill.amount
    res.asset.realEarnings -= res.currentBill.amount
    res.asset.earnings -= res.currentBill.amount
    await res.asset.save() 
  }catch(error){
    return res.json("error al intentar actualizar el activo")
  }
  const {date,amount} = req.body
  if(amount) res.currentBill.amount = amount
  if(date) res.currentBill.date = date
  try{
    res.asset.totalIncomes += res.currentBill.amount
    res.asset.realEarnings += res.currentBill.amount
    res.asset.earnings += res.currentBill.amount
    await res.currentBill.save()
    await res.asset.save()
    next()
  }catch(error){
    return res.json(responseObject(error,false,"ha ocurrido un error al actualizar la informacion"))
  }
}

async function updateRecoveryProgress(req,res){
  const asset = res.asset
  try{
    if(asset.realEarnings<0){
      asset.investmentRecoveryProgress = 100-(((asset.realEarnings *100)*-1)/asset.assetCost)
      await asset.save()
      return res.status(200).json(responseObject(null,true,"Toda la informacion actualizada correctamente"))
    }
    return res.json("inversion recuperada")
  }catch(error){
    res.status(500).json(responseObject(error,false,"ha ocurrido un error al actualizar el porcentaje"))
  }
}

async function deleteBill(req,res,next){
  const billId = req.params.id
  const asset = res.asset
  const amount = res.currentBill.amount
  try{
    await bill.deleteOne({_id:billId})
    asset.realEarnings -= amount
    asset.earnings -= amount
    asset.totalIncomes -= amount
    await asset.save()
    next()
  }catch(error){
    return res.json(responseObject(error,false,"no se ha podido eliminar"))
  }
}

module.exports = router