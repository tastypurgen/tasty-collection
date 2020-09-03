const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/HttpError');
const User = require('../models/User');

const USERS = [
  {
    id: 'u1',
    name: 'Tasty Purgen',
    email: 'u11@u1.u1',
    password: 'u1@u1.u1',
    image: 'https://upload.wikimedia.org/wikipedia/en/d/dc/Pocket_Mortys.png',
    items: 3,
    isAdmin: true,
  },
  {
    id: 'u2',
    name: 'Andy Kaufman',
    email: 'u12@u2.u2',
    password: 'u2@u2.u2',
    image: 'https://i.pinimg.com/originals/08/7a/59/087a5944d37373f62af0cb272195f63f.jpg',
    items: 1,
    isAdmin: false,
  },
];

const getAllUsers = (res) => {
  res.status(201).json({ users: USERS });
};

const createUser = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(new HttpError('Please check entered data', 422));
  }

  const {
    name, email, password, items,
  } = req.body;

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
    image: 'https://upload.wikimedia.org/wikipedia/en/d/dc/Pocket_Mortys.png',
    password,
    items,
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  const foundUser = USERS.find((user) => user.email === email);

  if (!foundUser || foundUser.password !== password) {
    return next(new HttpError('Wrong email or password', 401));
  }

  res.json({ message: 'Signed in' });
};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
