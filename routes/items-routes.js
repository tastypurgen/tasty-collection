/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');

const itemsControllers = require('../controllers/items-controller')

const router = express.Router();

router.get('/:itemId', itemsControllers.getItemById);

router.get('/user/:userId', itemsControllers.getItemByUserId);



module.exports = router;
