const { createError } = require("../../helpers");
const { cloudinaryUpload, cloudinaryUploadOptions } = require("../../helpers");

const { Superhero } = require("../../models");

async function addSuperheroImage(req, res) {
  const { superheroId } = req.params;
  const { path } = req.file;

  const superhero = await Superhero.findById(superheroId);

  if (!superhero) {
    throw createError(404);
  }

  try {
    const newImage = await cloudinaryUpload(path, {
      ...cloudinaryUploadOptions,
      tags: superhero.nickname,
    });

    const result = await Superhero.findByIdAndUpdate(
      superheroId,
      {
        images: [newImage, ...superhero.images],
      },
      { new: true }
    );

    res.json(result);
  } catch (error) {
    throw createError(400, `${error}`);
  }
}

module.exports = addSuperheroImage;
