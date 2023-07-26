const { checkSchema } = require("express-validator");
const { validationErrorHandler } = require("./validationErrorHandler");

const userProfileSchemValidator = [
  checkSchema({
    title: {
      require: true,
      isAlphanumeric: true,
      isLength: {
        options: {
          min: 5,
          max: 30,
        },
      },
    },
    description: {
      require: true,
      isString: true,
      escape: true,
      isLength: {
        options: {
          min: 5,
          max: 100,
        },
      },
    },
  }),
  validationErrorHandler,
];
module.exports = {
    userProfileSchemValidator,
};
