const jwt = require('jsonwebtoken');

const HttpError = require('../models/HttpError');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') return next();

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      // eslint-disable-next-line no-console
      console.log('token: ', token);
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId, name: decodedToken.name };
    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error: ', error);
    return next(new HttpError('Authentication failed', 401));
  }
};
