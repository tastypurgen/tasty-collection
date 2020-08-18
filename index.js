const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('MongoDB connected')
});

const app = express();

const PORT = process.env.PORT

app.listen(PORT, console.log(`Server started on port ${PORT}`))