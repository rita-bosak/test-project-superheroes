const fs = require("fs/promises");

const { cloudinaryUpload } = require("../../helpers");
const { createError } = require("../../helpers");

const { Superhero } = require("../../models");

async function addSuperhero(req, res) {
  const { nickname } = req.body;
  const { path: tempUpload } = req.file;
  const imagesArray = [];

  try {
    const resultUpload = await cloudinaryUpload(tempUpload, {
      folder: "superheroes",
      height: 370,
      width: 280,
      crop: "fill",
      tags: nickname,
    });

    fs.unlink(tempUpload);
    imagesArray.push(resultUpload);

    const result = await Superhero.create({
      ...req.body,
      images: imagesArray,
    });

    res.json({ result });
  } catch (error) {
    await fs.unlink(tempUpload);

    throw createError(400, `${error}`);
  }
}

module.exports = addSuperhero;
