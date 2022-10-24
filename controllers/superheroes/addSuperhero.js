const fs = require("fs/promises");
const path = require("path");

const { createError } = require("../../helpers");
const { Superhero } = require("../../models");

const imagesDir = path.join(__dirname, "../../", "public", "superheroes");

async function addSuperhero(req, res) {
  const { nickname } = req.body;
  const { path: tempUpload, originalname } = req.file;
  const imageName = `${nickname}_${originalname}`;

  try {
    const resultUpload = path.join(imagesDir, imageName);
    await fs.rename(tempUpload, resultUpload);

    const imagesURL = path.join("public", "superheroes", originalname);

    const result = await Superhero.create({
      ...req.body,
      images: imagesURL,
    });

    res.json({ result });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw createError(400);
  }
}

module.exports = addSuperhero;
