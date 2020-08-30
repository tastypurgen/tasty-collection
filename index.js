/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const itemsRoutes = require('./routes/items-routes');
const HttpError = require('./models/HttpError');
const usersRoutes = require('./routes/users-routes');

const app = express();
app.use(express.json());

app.use('/api/items', itemsRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  throw new HttpError('Not found', 404)
});

app.use((error, req, res, next) => {
  if (!res.headerSent) next(error);

  res.status(error.code || 500);
  res.json({ message: error.message || 'Unknown message' });
});

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB connected');
});

const { PORT } = process.env;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
