const fs = require("fs/promises");
const cloudinary = require("cloudinary").v2;

const { createError } = require("../../helpers");
const { Superhero } = require("../../models");

async function addSuperhero(req, res) {
  const { path: tempUpload } = req.file;

  try {
    const image = await cloudinary.uploader
      .upload(tempUpload)
      .then(({ url }) => {
        fs.unlink(tempUpload);
        return url;
      })
      .catch((error) => console.log(error));

    const result = await Superhero.create({
      ...req.body,
      images: image,
    });

    res.json({ result });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw createError(400);
  }
}

module.exports = addSuperhero;
