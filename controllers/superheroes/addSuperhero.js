const { cloudinaryUpload, cloudinaryUploadOptions } = require("../../helpers");
const { createError } = require("../../helpers");

const { Superhero } = require("../../models");

async function addSuperhero(req, res) {
  const { nickname } = req.body;
  const files = req.files;
  const imagesArray = [];

  try {
    for (const file of files) {
      const resultUpload = await cloudinaryUpload(file.path, {
        ...cloudinaryUploadOptions,
        tags: nickname,
      });

      imagesArray.push(resultUpload);
    }

    const result = await Superhero.create({
      ...req.body,
      images: imagesArray,
    });

    res.json({ result });
  } catch (error) {
    throw createError(400, `${error}`);
  }
}

module.exports = addSuperhero;
