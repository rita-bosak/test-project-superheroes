const { Schema, model } = require("mongoose");
const Joi = require("joi");

const superheroSchema = Schema(
  {
    nickname: {
      type: String,
      required: [true, "Set a nickname for the Superhero"],
    },
    real_name: {
      type: String,
      required: true,
    },
    origin_description: {
      type: String,
      required: true,
    },
    superpowers: {
      type: String,
      required: true,
    },
    catch_phrase: {
      type: String,
      required: true,
    },
    images: String,
  },
  { versionKey: false, timestamps: true }
);

const superheroAddSchema = Joi.object({
  nickname: Joi.string().required(),
  real_name: Joi.string().required(),
  origin_description: Joi.string().required(),
  superpowers: Joi.string().required(),
  catch_phrase: Joi.string().required(),
  images: Joi.object(),
});

const superheroQuerySchema = Joi.object({
  page: Joi.number().min(1),
  limit: Joi.number().min(1),
});

const Superhero = model("superheroes", superheroSchema);

module.exports = { Superhero, superheroAddSchema, superheroQuerySchema };
