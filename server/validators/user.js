const { checkSchema } = require("express-validator");
const { validationErrorHandler } = require("./validationErrorHandler");

const signinSchemaValidator = [
  checkSchema({
    email: {
      errorMessage: "Invalid username",
      isEmail: true,
    },
    password: {
      isLength: {
        options: { min: 3 },
        errorMessage: "Password should be at least 8 chars",
      },
    },
  }),
  validationErrorHandler,
];

const profileSchemaValidator = [
  checkSchema({
    first_name: {
      require: true,
      isAlpha: true,
      isLength: { options: { min: 5 } },
      errorMessage: "Invalid first name",
    },
    last_name: {
      optional: {
        nullable: true,
      },
      isLength: {
        options: {
          min: 5,
        },
      },
      errorMessage: "Invalid last name",
    },
  }),
  validationErrorHandler,
];
module.exports = {
  signinSchemaValidator,
  profileSchemaValidator,
};
