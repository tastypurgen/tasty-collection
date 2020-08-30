const { v4: uuid } = require('uuid');

const HttpError = require('../models/http-error')

let USERS = [
  {
    id: 'u1',
    name: 'Tasty Purgen',
    email: "u11@u1.u1",
    password: "u1@u1.u1",
    image: 'https://upload.wikimedia.org/wikipedia/en/d/dc/Pocket_Mortys.png',
    items: 3,
    isAdmin: true,
  },
  {
    id: 'u2',
    name: 'Andy Kaufman',
    email: "u12@u2.u2",
    password: "u2@u2.u2",
    image: 'https://i.pinimg.com/originals/08/7a/59/087a5944d37373f62af0cb272195f63f.jpg',
    items: 1,
    isAdmin: false,
  },
];

const getAllUsers = (req, res, next) => {
  res.status(201).json({ users: USERS });
}

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  const isExist = USERS.find(user => user.email === email)

  if (isExist) throw new HttpError('Email is already taken', 422)

  const createdUser = {
    id: uuid(),
    name,
    email,
    password
  }

  USERS.push(createdUser);
  res.status(201).json({ user: createdUser })
}

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  console.log('USERS: ', USERS);

  const foundUser = USERS.find(user => user.email === email)
  console.log(foundUser)
  if (!foundUser || foundUser.password !== password) throw new HttpError('Wrong email or password', 401)

  res.json({ message: 'Signed in' })
}

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;