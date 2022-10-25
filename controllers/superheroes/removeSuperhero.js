const { Superhero } = require("../../models");
const { createError } = require("../../helpers");
const { cloudinaryDelete } = require("../../helpers");

async function removeSuperhero(req, res) {
  const { superheroId } = req.params;
  const imagesIds = [];

  const superhero = await Superhero.findByIdAndRemove(superheroId);

  if (!superhero) {
    throw createError(404);
  }

  superhero.images.forEach((image) => imagesIds.push(image.publicId));
  await cloudinaryDelete(imagesIds);

  res.json(superhero);
}

module.exports = removeSuperhero;
