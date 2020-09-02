const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: Array, required: true },
  likes: Number,
  creatorId: { type: String, required: true }
})

module.exports = mongoose.model('Item', ItemSchema)