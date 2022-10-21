const { Superhero } = require("../../models");
const { createError } = require("../../helpers");

const updateSuperhero = async (req, res) => {
  const { superheroId } = req.params;

  const result = await Superhero.findByIdAndUpdate(superheroId, req.body, {
    new: true,
  });

  if (!result) {
    throw createError(404);
  }

  res.json({ response: { result } });
};

module.exports = updateSuperhero;
