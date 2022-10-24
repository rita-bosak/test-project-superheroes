const cloudinary = require("cloudinary").v2;

const { createError } = require("./createError");

const cloudinaryUpload = (filePath, config) =>
  cloudinary.uploader
    .upload(filePath, config)
    .then(({ url, tags }) => {
      return { url, tags };
    })
    .catch((error) => {
      throw createError(400, `${error}`);
    });

module.exports = cloudinaryUpload;
