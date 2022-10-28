const mongoose = require('mongoose')
const { Schema } = mongoose;

const assetSchema = new Schema({
  _id : Schema.Types.ObjectId,
  name: String,
  assetCost : Number,
  earnings : Number,
  investmentRecoveryDate : Date,
  totalIncomes : Number,
  investmentRecoveryProgress : Number,
  purchaseDate : Date
})

const Asset = mongoose.model('Asset', assetSchema)

module.exports = Asset