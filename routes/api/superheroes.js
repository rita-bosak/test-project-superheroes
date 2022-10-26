const express = require("express");
const { ctrlWrapper, validation, upload } = require("../../middlewares");
const { superheroes: ctrl } = require("../../controllers");
const {
  addSuperheroSchema,
  listSuperheroesQuerySchema,
} = require("../../models");

const router = express.Router();

router.get(
  "/",
  validation(listSuperheroesQuerySchema, "query"),
  ctrlWrapper(ctrl.listSuperheroes)
);

router.get("/:id", ctrlWrapper(ctrl.getSuperheroById));

router.post(
  "/",
  validation(addSuperheroSchema),
  upload.array("images"),
  ctrlWrapper(ctrl.addSuperhero)
);

router.delete("/:superheroId", ctrlWrapper(ctrl.removeSuperhero));

router.put(
  "/:superheroId",
  validation(addSuperheroSchema),
  ctrlWrapper(ctrl.updateSuperhero)
);

router.patch(
  "/:superheroId/images/add",
  upload.single("image"),
  ctrlWrapper(ctrl.addSuperheroImage)
);

router.patch(
  "/:superheroId/images/delete/:publicId",
  ctrlWrapper(ctrl.removeSuperheroImage)
);

module.exports = router;
