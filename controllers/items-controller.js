const { v4: uuid } = require('uuid');

const HttpError = require('../models/http-error')

let ITEMS = [
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

const getItemById = (req, res, next) => {
  const { itemId } = req.params;
  const item = ITEMS.find((key) => key.id === itemId);

  if (!item) throw new HttpError('Could not found an item by ID', 404);

  res.json(item);
}

const getItemsByUserId = (req, res, next) => {
  const { userId } = req.params;
  const items = ITEMS.filter((key) => key.creatorId === userId);

  if (!items || items.length === 0) {
    return next(new HttpError('Could not found items by USER ID', 404));
  }
  res.json(items);
}

const createItem = (req, res, next) => {
  const { id, title, description, creatorId } = req.body;

  const createdItem = { id: uuid(), title, description, creatorId };

  ITEMS.push(createdItem)
  res.status(201).json({ item: createdItem })
  console.log(ITEMS)
}

const updateItem = (req, res, next) => {
  const { title, description, } = req.body;
  const { itemId } = req.params;

  const updatedItem = { ...ITEMS.find((key) => key.id === itemId) }
  const itemIndex = ITEMS.findIndex((key) => key.id === itemId)

  updatedItem.title = title;
  updatedItem.description = description;

  ITEMS[itemIndex] = updatedItem;

  res.status(200).json({ item: updatedItem })
}

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ITEMS = ITEMS.filter(item => item.id !== itemId)

  res.status(200).json({ message: 'Item deleted' })
}

exports.getItemById = getItemById;
exports.getItemsByUserId = getItemsByUserId;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;