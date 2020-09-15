const { config } = require('cloudinary').v2;

const cloudinaryConfig = () => config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = cloudinaryConfig;
