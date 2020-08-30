const express = require('express');

const { getItemById, getItemByUserId, createItem, updateItem, deleteItem } = require('../controllers/items-controller')

const router = express.Router();

router.get('/:itemId', getItemById);

router.get('/user/:userId', getItemByUserId);

router.post('/', createItem)

router.patch('/:itemId', updateItem)
router.delete('/:itemId', deleteItem)

module.exports = router;
