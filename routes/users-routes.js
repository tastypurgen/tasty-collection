const { Router } = require('express');
const { check } = require('express-validator');
const passport = require('passport');

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

router.post('/signin',
  passport.authenticate('local'),
  (req, res) => {
    console.log(req.body);
    res.json({
      message: 'Signed in',
      user: req.user.toObject({ getters: true }),
    });
  });

module.exports = router;
