const asset = require('../models/assets')
const {responseObject} = require('../utils/utils')

async function getAsset(req,res,next){
  try{
    const selectedAsset = await asset.findById(res.data.asset)
    if(!selectedAsset){
      return res.status(404).json(responseObject(error,false,"no existe el activo"))
    }
    res.asset = selectedAsset
    next()
  }catch(error){
    return res.status(500).json(responseObject(error,false, "error obteniendo el activo"))
  }
}

async function updateRecoveryProgress(req,res){
  const asset = res.asset
  try{
    if(asset.realEarnings<0){
      asset.investmentRecoveryProgress = 100-(((asset.realEarnings *100)*-1)/asset.assetCost)
      await asset.save()
      return res.status(200).json(responseObject(null,true,"Toda la informacion actualizada correctamente"))
    }else if (asset.realEarnings >= 0){
      asset.investmentRecoveryProgress = 100
      await asset.save()
      console.log("here")
      return res.status(200).json(responseObject(null,true,"Toda la informacion actualizada correctamente"))
    }
    //return res.json("inversion recuperada")
  }catch(error){
    res.status(500).json(responseObject(error,false,"ha ocurrido un error al actualizar el porcentaje"))
  }
}


module.exports = {getAsset, updateRecoveryProgress}