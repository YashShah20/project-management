const { checkSchema } = require("express-validator");
const { validationErrorHandler } = require("./validationErrorHandler");
const roleSchemaValidator = [
  checkSchema({
    title: {
      require: true,
      isString: true,
      escape: true,
      isLength: {
        options: {
          min: 3,
          max: 30,
        },
      },
    },
    access_level: {
      require: true,
      isInt: {
        options: {
          min: 1,
          max: 30,
        },
      },
    },
  }),
  validationErrorHandler,
];

module.exports = { roleSchemaValidator };
