const { Superhero } = require("../../models");
const { createError } = require("../../helpers");

const updateSuperheroInfo = async (req, res) => {
  const { superheroId, property } = req.params;
  const { payload } = req.body;
  try {
    const superhero = await Superhero.findById(superheroId);

    const newSuperhero = { ...superhero._doc };
    newSuperhero[property] = payload;
    delete newSuperhero._id;

    const updatedSuperhero = await Superhero.findByIdAndUpdate(
      superheroId,
      newSuperhero,
      {
        new: true,
      }
    );
    res.json(updatedSuperhero);
  } catch (error) {
    throw createError(400, `${error}`);
  }
};

module.exports = updateSuperheroInfo;
