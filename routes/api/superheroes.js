const express = require("express");
const { ctrlWrapper, validation, upload } = require("../../middlewares");
const { superheroes: ctrl } = require("../../controllers");
const { addSuperheroSchema, addSuperheroQuerySchema } = require("../../models");

const router = express.Router();

router.get(
  "/",
  validation(addSuperheroQuerySchema, "query"),
  ctrlWrapper(ctrl.listSuperheroes)
);

router.get("/:id", ctrlWrapper(ctrl.getSuperheroById));

router.post("/", upload.array("images"), ctrlWrapper(ctrl.addSuperhero));

router.delete("/:superheroId", ctrlWrapper(ctrl.removeSuperhero));

router.put(
  "/:superheroId",
  validation(addSuperheroSchema),
  ctrlWrapper(ctrl.updateSuperhero)
);

router.patch(
  "/:superheroId/images",
  upload.single("image"),
  ctrlWrapper(ctrl.addSuperheroImage)
);

router.patch(
  "/:superheroId/images/:publicId",
  ctrlWrapper(ctrl.removeSuperheroImage)
);

module.exports = router;
