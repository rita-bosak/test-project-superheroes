const fs = require("fs/promises");
const cloudinary = require("cloudinary").v2;

const { createError } = require("../../helpers");
const { Superhero } = require("../../models");

async function addSuperhero(req, res) {
  const { nickname } = req.body;
  const { path: tempUpload } = req.file;

  try {
    const image = await cloudinary.uploader
      .upload(tempUpload, {
        folder: "superheroes",
        height: 370,
        width: 280,
        crop: "fill",
        tags: nickname,
      })
      .then(({ url, tags }) => {
        fs.unlink(tempUpload);
        return { url, tags };
      });

    const result = await Superhero.create({
      ...req.body,
      images: [image],
    });

    res.json({ result });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw createError(400, `${error}`);
  }
}

module.exports = addSuperhero;
