const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  type: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model('Item', CommentSchema);
