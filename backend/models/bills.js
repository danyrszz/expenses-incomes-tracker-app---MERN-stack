const mongoose = require('mongoose')
const { Schema } = mongoose;

const billSchema = new Schema({
  amount : Number,
  date : Date,
  asset : {type:Schema.Types.ObjectId, ref: 'Asset'}
})

const Bill = mongoose.model('Bill', billSchema)

module.exports = Bill