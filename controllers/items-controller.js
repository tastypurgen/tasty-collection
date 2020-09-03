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
// eslint-disable-next-line max-len
//     description: "The Shawshank Redemption is a 1994 American drama film written and directed by Frank Darabont, based on the 1982 Stephen King novella",
//     image: "https://images-na.ssl-images-amazon.com/images/I/51zUbui%2BgbL.jpg",
//     tags: ["drama", "interesting", "film", "fiction"],
//     likes: 6,
//     creatorId: "u1",
//   },
// ];

const getItemById = async (req, res, next) => {
  const { itemId } = req.params;
  let item;

  try {
    item = await Item.findById(itemId);
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  if (!item) {
    return next(new HttpError('Could not found an item by ID', 404));
  }

  res.json({ item: item.toObject({ getters: true }) });
};

const getItemsByUserId = async (req, res, next) => {
  const { userId } = req.params;
  let items;

  try {
    items = await Item.find({ creatorId: userId });
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  if (!items || items.length === 0) {
    return next(new HttpError('Could not found items by USER ID', 404));
  }

  res.json({ items: items.map((item) => item.toObject({ getters: true })) });
};

const createItem = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(new HttpError('Please check entered data', 422));
  }

  const {
    type, title, description, tags, creatorId,
  } = req.body;

  const createdItem = new Item({
    type,
    title,
    description,
    image: 'https://images-na.ssl-images-amazon.com/images/I/91SZSW8qSsL.jpg',
    tags,
    creatorId,
  });

  try {
    await createdItem.save();
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  res.status(201).json({ item: createdItem });
};

const updateItem = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(new HttpError('Please check entered data', 422));
  }

  const { title, description } = req.body;
  const { itemId } = req.params;

  let item;

  try {
    item = await Item.findById(itemId);
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  item.title = title;
  item.description = description;

  try {
    await item.save();
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  res.status(200).json({ item: item.toObject({ getters: true }) });
};

const deleteItem = async (req, res, next) => {
  const { itemId } = req.params;

  let item;

  try {
    item = await Item.findById(itemId);
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  try {
    await item.remove();
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  res.status(200).json({ message: 'Item deleted' });
};

exports.getItemById = getItemById;
exports.getItemsByUserId = getItemsByUserId;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
