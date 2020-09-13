const { Router } = require('express');
const { check } = require('express-validator');
const fileUpload = require('../middleware/file-upload');

const {
  getItemById, getItemsByUserId, createItem, updateItem, deleteItem,
} = require('../controllers/items-controller');
const authCheck = require('../middleware/auth-check');

const router = Router();

router.get('/:itemId', getItemById);

router.get('/user/:userId', getItemsByUserId);

router.use(authCheck);

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
  ],
  createItem,
);

router.patch(
  '/:itemId',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
  ],
  updateItem,
);

router.delete('/:itemId', deleteItem);

module.exports = router;
