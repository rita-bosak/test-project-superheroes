const { Superhero } = require("../../models");
const { createError } = require("../../helpers");

async function removeSuperhero(req, res) {
  const { superheroId } = req.params;
  const result = await Superhero.findByIdAndRemove(superheroId);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
}

module.exports = removeSuperhero;
