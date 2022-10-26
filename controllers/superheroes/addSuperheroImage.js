const { createError } = require("../../helpers");
const { cloudinaryUpload } = require("../../helpers");

const { Superhero } = require("../../models");

const cloudinaryUploadOptions = {
  height: 370,
  width: 280,
  crop: "fill",
};

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
        images: [...superhero.images, newImage],
      },
      { new: true }
    );

    res.json(result);
  } catch (error) {
    throw createError(400, `${error}`);
  }
}

module.exports = addSuperheroImage;
