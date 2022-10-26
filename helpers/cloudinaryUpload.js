const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");

const { createError } = require("./createError");

const cloudinaryUploadOptions = {
  height: 270,
  width: 225,
  crop: "fill",
};

const cloudinaryUpload = async (filePath, config) => {
  try {
    const uploadedImage = await cloudinary.uploader.upload(filePath, config);

    const { url, tags, public_id: publicId, width, height } = uploadedImage;

    fs.unlink(filePath);

    return { url, tags, publicId, width, height };
  } catch (error) {
    fs.unlink(filePath);

    throw createError(400, `${error}`);
  }
};

module.exports = { cloudinaryUpload, cloudinaryUploadOptions };
