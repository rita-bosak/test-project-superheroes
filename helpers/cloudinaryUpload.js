const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");

const { createError } = require("./createError");

const cloudinaryUpload = async (filePath, config) =>
  await cloudinary.uploader
    .upload(filePath, config)
    .then(({ url, tags, public_id: publicId }) => {
      return { url, tags, publicId };
    })
    .catch((error) => {
      fs.unlink(filePath);
      throw createError(400, `${error}`);
    });

module.exports = cloudinaryUpload;
