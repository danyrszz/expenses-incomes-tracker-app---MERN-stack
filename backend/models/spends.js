const mongoose = require('mongoose')
const { Schema } = mongoose;

const spendSchema = new Schema({
  name: String,
  description : String,
  category : String,
  amount : Number,
  date : Date,
  payed : Boolean,
  asset : {type:Schema.Types.ObjectId, ref: 'Asset'}
})

const Spend = mongoose.model('Spend', spendSchema)

module.exports = Spend