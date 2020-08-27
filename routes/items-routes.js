/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');

const HttpError = require('../models/http-error')

const router = express.Router();

const ITEMS = [
  {
    id: 'i1',
    type: 'book',
    title: '1984',
    description: 'Exciting book!',
    image: 'https://images-na.ssl-images-amazon.com/images/I/91SZSW8qSsL.jpg',
    tags: ['interesting', 'book', 'dystopia'],
    likes: 3,
    creatorId: 'u1',
  },
  {
    id: 'i2',
    type: 'book',
    title: 'Flowers for Algernon',
    description: 'My favorite book',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41eDhPsmjbL._SX323_BO1,204,203,200_.jpg',
    tags: ['book', 'fiction'],
    likes: 10,
    creatorId: 'u2',
  },
  {
    id: 'i3',
    type: 'film',
    title: 'The Shawshank Redemption',
    description: 'The Shawshank Redemption is a 1994 American drama film written and directed by Frank Darabont, based on the 1982 Stephen King novella',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51zUbui%2BgbL.jpg',
    tags: ['drama', 'interesting', 'film', 'fiction'],
    likes: 6,
    creatorId: 'u1',
  },
];

router.get('/:itemId', (req, res) => {
  const { itemId } = req.params;
  const item = ITEMS.find((key) => key.id === itemId);

  if (!item) throw new HttpError('Could not found an item by ID', 404);

  res.json(item);
});

router.get('/user/:userId', (req, res, next) => {
  const { userId } = req.params;
  const item = ITEMS.find((key) => key.creatorId === userId);

  if (!item) {
    return next(new HttpError('Could not found an item by USER ID', 404));
  }
  res.json(item);
});



module.exports = router;
