const cloudinary = require("cloudinary").v2;

const { createError } = require("./createError");

// pucblicIds parameter accepts array of string
const cloudinaryDelete = async (publicIds, options) =>
  await cloudinary.api
    .delete_resources(publicIds, options)
    .then()
    .catch((error) => {
      throw createError(400, `${error}`);
    });

module.exports = cloudinaryDelete;
