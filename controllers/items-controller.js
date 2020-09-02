const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/HttpError');
const Item = require('../models/Item');

// let ITEMS = [
//   {
//     id: 'i1',
//     type: 'book',
//     title: '1984',
//     description: 'Exciting book!',
//     image: 'https://images-na.ssl-images-amazon.com/images/I/91SZSW8qSsL.jpg',
//     tags: ['interesting', 'book', 'dystopia'],
//     likes: 3,
//     creatorId: 'u1',
//   },
//   {
//     id: 'i2',
//     type: 'book',
//     title: 'Flowers for Algernon',
//     description: 'My favorite book',
//     image: 'https://images-na.ssl-images-amazon.com/images/I/41eDhPsmjbL._SX323_BO1,204,203,200_.jpg',
//     tags: ['book', 'fiction'],
//     likes: 10,
//     creatorId: 'u2',
//   },
//   {
//     id: "i3",
//     type: "film",
//     title: "The Shawshank Redemption",
//     description: "The Shawshank Redemption is a 1994 American drama film written and directed by Frank Darabont, based on the 1982 Stephen King novella",
//     image: "https://images-na.ssl-images-amazon.com/images/I/51zUbui%2BgbL.jpg",
//     tags: ["drama", "interesting", "film", "fiction"],
//     likes: 6,
//     creatorId: "u1",
//   },
// ];

const getItemById = (req, res, next) => {
  const { itemId } = req.params;
  const item = ITEMS.find((key) => key.id === itemId);

  if (!item) throw new HttpError('Could not found an item by ID', 404);

  res.json(item);
};

const getItemsByUserId = (req, res, next) => {
  const { userId } = req.params;
  const items = ITEMS.filter((key) => key.creatorId === userId);

  if (!items || items.length === 0) {
    return next(new HttpError('Could not found items by USER ID', 404));
  }
  res.json(items);
};

const createItem = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    throw new HttpError('Please check entered data', 422);
  }

  const {
    id, title, description, creatorId,
  } = req.body;

  const createdItem = new Item({
    type: 'test',
    description,
    image: 'https://images-na.ssl-images-amazon.com/images/I/91SZSW8qSsL.jpg',
    tags: ['test'],
    likes: 6,
    creatorId
  })

  try {
    await createdItem.save();
  } catch (error) {
    return next(new HttpError(error, 500))
  }

  res.status(201).json({ item: createdItem });
};

const updateItem = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    throw new HttpError('Please check entered data', 422);
  }

  const { title, description } = req.body;
  const { itemId } = req.params;

  const updatedItem = { ...ITEMS.find((key) => key.id === itemId) };
  const itemIndex = ITEMS.findIndex((key) => key.id === itemId);

  updatedItem.title = title;
  updatedItem.description = description;

  ITEMS[itemIndex] = updatedItem;

  res.status(200).json({ item: updatedItem });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  if (!ITEMS.find((item) => item.id === itemId)) {
    throw new HttpError('Deletion is failed. Item not found', 404);
  }

  ITEMS = ITEMS.filter((item) => item.id !== itemId);

  res.status(200).json({ message: 'Item deleted' });
};

exports.getItemById = getItemById;
exports.getItemsByUserId = getItemsByUserId;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;