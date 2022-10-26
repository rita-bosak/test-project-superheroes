const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");

const { createError } = require("./createError");

const cloudinaryUpload = async (filePath, config) => {
  try {
    const uploadedImage = await cloudinary.uploader.upload(filePath, config);

    const { url, tags, public_id: publicId } = uploadedImage;

    fs.unlink(filePath);

    return { url, tags, publicId };
  } catch (error) {
    fs.unlink(filePath);

    throw createError(400, `${error}`);
  }
};

module.exports = cloudinaryUpload;
