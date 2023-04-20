const mongoose = require('mongoose')
const { Schema } = mongoose;

const assetSchema = new Schema({
  name: String,
  assetCost : Number,
  earnings : Number,
  realEarnings : Number,
  investmentRecoveryDate : Date,
  totalIncomes : Number,
  investmentRecoveryProgress : Number,
  purchaseDate : Date,
  type : String
})

const Asset = mongoose.model('Asset', assetSchema)

module.exports = Asset