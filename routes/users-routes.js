const express = require('express');

const { getAllUsers, createUser, loginUser } = require('../controllers/users-controller')

const router = express.Router();

router.get('/', getAllUsers);

router.post('/signup', createUser)

router.post('/signin', loginUser)

module.exports = router;
