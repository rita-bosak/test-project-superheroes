const { createError } = require("../../helpers");
const { cloudinaryDelete } = require("../../helpers");

const { Superhero } = require("../../models");

async function removeSuperheroImage(req, res) {
  const { superheroId, imageId } = req.params;

  const superhero = await Superhero.findById(superheroId);

  if (!superhero) {
    throw createError(404);
  }

  const { images } = superhero;

  const imageToDelete = images.find((image) => image._id === imageId);

  const updatedImages = images.filter((image) => image !== imageToDelete);

  const result = await Superhero.findByIdAndUpdate(superheroId, {
    images: updatedImages,
  });

  if (!result) {
    throw createError(400);
  }

  await cloudinaryDelete([imageToDelete.publicId]);

  res.json(result);
}

module.exports = removeSuperheroImage;
