const mongoose = require('mongoose')
const { Schema } = mongoose;

const billSchema = new Schema({
  //_id : mongoose.Types.ObjectId,
  amount : Number,
  date : Date,
  asset : {type:Schema.Types.ObjectId, ref: 'Asset'}
})

const Bill = mongoose.model('Bill', billSchema)

module.exports = Bill