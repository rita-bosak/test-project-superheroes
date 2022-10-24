const express = require("express");
const { ctrlWrapper, validation, upload } = require("../../middlewares");
const { superheroes: ctrl } = require("../../controllers");
const { superheroAddSchema, superheroQuerySchema } = require("../../models");

const router = express.Router();

router.get(
  "/",
  validation(superheroQuerySchema, "query"),
  ctrlWrapper(ctrl.listSuperheroes)
);

router.get("/:superheroId", ctrlWrapper(ctrl.getSuperheroById));

router.post("/", upload.array("images"), ctrlWrapper(ctrl.addSuperhero));

router.delete("/:superheroId", ctrlWrapper(ctrl.removeSuperhero));

router.put(
  "/:superheroId",
  validation(superheroAddSchema),
  ctrlWrapper(ctrl.updateSuperhero)
);

module.exports = router;
