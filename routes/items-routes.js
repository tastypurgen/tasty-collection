const express = require('express');

const { getItemById, getItemByUserId, createItem } = require('../controllers/items-controller')

const router = express.Router();

router.get('/:itemId', getItemById);

router.get('/user/:userId', getItemByUserId);

router.post('/', createItem)

module.exports = router;
