const { createError } = require("../../helpers");
const { Superhero } = require("../../models");

async function addSuperhero(req, res) {
  const result = await Superhero.create({ ...req.body });

  if (!result) {
    throw createError(400);
  }

  res.json({ status: "success", code: 201, data: { result } });
}

module.exports = addSuperhero;
