// const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

  let foundUser;
  try {
    foundUser = await User.findOne({ email });
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  if (foundUser) {
    return next(new HttpError('User exists', 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password: hashedPassword,
    isAdmin: false,
    items: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  let token;
  try {
    token = jwt.sign({ userId: createUser.id, name: createUser.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return next(new HttpError('Signing up failed'));
  }

  res.status(201).json({ userId: createdUser.id, name: createdUser.name, token });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  let foundUser;
  try {
    foundUser = await User.findOne({ email });
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  if (!foundUser || await !bcrypt.compare(password, foundUser.password)) {
    return next(new HttpError('Wrong email or password', 401));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: foundUser.id, name: foundUser.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return next(new HttpError('Signing in failed'));
  }

  res.json({ userId: foundUser.id, name: foundUser.name, token });
};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
