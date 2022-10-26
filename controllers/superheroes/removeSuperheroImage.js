const { createError } = require("../../helpers");
const { cloudinaryDelete } = require("../../helpers");

const { Superhero } = require("../../models");

async function removeSuperheroImage(req, res) {
  const { superheroId } = req.params;
  const { publicId } = req.query;

  const superhero = await Superhero.findById(superheroId);

  if (!superhero) {
    throw createError(404);
  }

  const { images } = superhero;

  const updatedImages = images.filter((image) => image.publicId !== publicId);

  const result = await Superhero.findByIdAndUpdate(
    superheroId,
    {
      images: updatedImages,
    },
    { new: true }
  );

  if (!result) {
    throw createError(400);
  }

  await cloudinaryDelete([publicId]);

  res.json(result);
}

module.exports = removeSuperheroImage;
