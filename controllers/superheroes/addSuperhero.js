const { createError } = require("../../helpers");
const { Superhero } = require("../../models");

async function addSuperhero(req, res) {
  const result = await Superhero.create({ ...req.body });

  if (!result) {
    throw createError(400);
  }

  res.json(result);
}

module.exports = addSuperhero;
