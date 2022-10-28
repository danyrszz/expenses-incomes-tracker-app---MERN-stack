const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const spend = require('../models/spends')

mongoose.connect('mongodb://127.0.0.1:27017/taxi')

//get all of the spends
router.get("/", async (req,res)=>{
  const spends = await spend.find({}).populate('asset')
  res.json(spends)
})

//filter the spends starting from the provided date
router.get('/byDate/:date', async (req,res) => {
  const spends = await spend.find({date: {$gte: new Date(req.params.date)}})
  res.json(spends)
})

//get all of the spends ordered by date 
router.get('/byDate/:date1/:date2', async (req,res)=>{
  try{
    const spends = await spend.find(
      {date: { $gte : new Date(req.params.date1) , $lte: new Date(req.params.date2) } }
    )
    res.json(spends)
  } catch {
    res.status(400).json({
      message : "Error al realizar la consulta. Revisa tus parametros.",
      ok : false,
    })
  }
})

router.get('/:category', async(req,res)=>{
  const category = req.params.category
  const spends = await spend.find({category : category})
  res.json(spends)
})

function filterByDate(req,res,next){

}

module.exports = router