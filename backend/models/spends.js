const mongoose = require('mongoose')
const { Schema } = mongoose;

const spendSchema = new Schema({
  name: String,
  description : String,
  category : String,
  amount : Number,
  date : Date,
  asset : Schema.Types.ObjectId
})

const Spend = mongoose.model('Spend', spendSchema)

module.exports = Spend