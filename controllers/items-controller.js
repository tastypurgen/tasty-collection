// const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

const HttpError = require('../models/HttpError');
const Item = require('../models/Item');
const User = require('../models/User');

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
    // or await User.findById(userId).populate('items')
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
    // eslint-disable-next-line no-console
    console.log(validationErrors);
    return next(new HttpError('Please check entered data', 422));
  }

  const {
    type, title, description, tags,
  } = req.body;

  let imagePath;
  let publicId;
  try {
    const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: process.env.NODE_ENV
        ? 'tasty-collection/items'
        : 'tasty-collection-test/items',
    });

    imagePath = uploadResponse.secure_url;
    publicId = uploadResponse.public_id;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return next(new HttpError(err, 500));
  }

  const createdItem = new Item({
    type,
    publicId,
    title,
    description,
    image: imagePath,
    tags,
    creatorId: req.userData.userId,
  });

  let user;

  try {
    user = await User.findById(req.userData.userId);
  } catch (error) {
    return next(error);
  }

  if (!user) {
    return next(new HttpError('User with provided ID not found'), 404);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await createdItem.save({ session });
    user.items.push(createdItem);
    await user.save({ session });

    await session.commitTransaction();
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  res.status(201).json({ item: createdItem });
};

const updateItem = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    // eslint-disable-next-line no-console
    console.log(validationErrors);
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

  if (item.creatorId.toString() !== req.userData.userId) {
    return next(new HttpError('forbidden!', 403));
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
    item = await Item.findById(itemId).populate('creatorId');
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  if (!item) {
    return next(new HttpError('Place for this ID not found'), 404);
  }

  if (item.creatorId.id !== req.userData.userId) {
    return next(new HttpError('forbidden!', 403));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await item.remove({ session });
    item.creatorId.items.pull(item);
    await item.creatorId.save({ session });

    await session.commitTransaction();
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  try {
    await cloudinary.uploader.destroy(item.publicId);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return next(new HttpError(err, 500));
  }

  res.status(200).json({ message: 'Item deleted' });
};

exports.getItemById = getItemById;
exports.getItemsByUserId = getItemsByUserId;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
