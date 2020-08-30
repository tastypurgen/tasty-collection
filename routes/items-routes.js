const express = require('express');

const { getItemById, getItemsByUserId, createItem, updateItem, deleteItem } = require('../controllers/items-controller')

const router = express.Router();

router.get('/:itemId', getItemById);

router.get('/user/:userId', getItemsByUserId);

router.post('/', createItem)

router.patch('/:itemId', updateItem)
router.delete('/:itemId', deleteItem)

module.exports = router;
