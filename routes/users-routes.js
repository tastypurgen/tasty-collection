const { Router } = require('express');
const { check } = require('express-validator');

const { getAllUsers, createUser, loginUser } = require('../controllers/users-controller');
const fileUpload = require('../middleware/file-upload');

const router = Router();

router.get('/', getAllUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('name').not().isEmpty(),
    check('email').not().isEmpty(),
  ],
  createUser,
);

router.post('/signin', loginUser);

module.exports = router;
