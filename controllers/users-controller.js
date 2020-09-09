// const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/HttpError');
const User = require('../models/User');

const getAllUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, '-password');
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  res.status(201).json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const createUser = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    // eslint-disable-next-line no-console
    console.log(validationErrors);
    return next(new HttpError('Please check entered data', 422));
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  if (existingUser) {
    return next(new HttpError('User exists', 422));
  }

  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password,
    isAdmin: false,
    items: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  if (!existingUser || existingUser.password !== password) {
    return next(new HttpError('Wrong email or password', 401));
  }

  res.json({
    message: 'Signed in',
    user: existingUser.toObject({ getters: true }),
  });
};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
