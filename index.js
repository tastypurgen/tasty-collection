/* eslint-disable no-console */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const itemsRoutes = require('./routes/items-routes');
const HttpError = require('./models/HttpError');
const usersRoutes = require('./routes/users-routes');
const initializePassport = require('./config/passport-config');

const app = express();
app.use(express.json());

initializePassport(passport);
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/items', itemsRoutes);
app.use('/api/users', usersRoutes);

// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  throw new HttpError(`Route ${req.originalUrl} not found`, 404);
});

app.use((error, req, res, next) => {
  if (req.file) {
    console.log('req.file: ', req.file);
    fs.unlink(req.file.path, (err) => console.log(err));
  }

  if (!res.headerSent) next(error);

  res.status(error.code || 500);
  res.json({ message: error.message || 'Unknown message' });
});

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB connected');
});

const { PORT } = process.env;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
