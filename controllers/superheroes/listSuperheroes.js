const { Superhero } = require("../../models");

async function listSuperheroes(req, res) {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  const list = await Superhero.find().skip(skip).limit(limit);

  res.json({ status: "success", code: 200, data: { list } });
}

module.exports = listSuperheroes;
