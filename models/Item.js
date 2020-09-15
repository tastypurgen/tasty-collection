const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemSchema = new Schema({
  type: { type: String, required: true },
  publicId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: Array, required: true },
  likes: Number,
  creatorId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model('Item', ItemSchema);
