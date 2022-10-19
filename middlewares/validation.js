const { createError } = require("../helpers");

const validation =
  (schema, reqPart = "body") =>
  (req, res, next) => {
    const { error } = schema.validate(req[reqPart]);

    if (error) {
      throw createError(400, error.message);
    }

    next();
  };

module.exports = validation;
