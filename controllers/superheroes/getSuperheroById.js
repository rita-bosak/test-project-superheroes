const { Superhero } = require("../../models");
const { createError } = require("../../helpers");

async function getSuperheroById(req, res) {
  const { superheroId } = req.params;

  const result = await Superhero.findById(superheroId);

  if (!result) {
    throw createError(404);
  }

  res.json(result);
}

module.exports = getSuperheroById;
