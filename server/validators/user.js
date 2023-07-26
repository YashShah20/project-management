const { checkSchema } = require("express-validator");
const { validationErrorHandler } = require("./validationErrorHandler");

const signinSchemaValidator = [
  checkSchema({
    email: {
      require: true,
      isEmail: true,
      errorMessage: "Invalid email",
    },
    password: {
      isLength: {
        options: { min: 3 },
        errorMessage: "Password should be at least 3 chars",
      },
    },
  }),
  validationErrorHandler,
];

const profileSchemaValidator = [
  checkSchema({
    first_name: {
      require: true,
      isAlphaWithSpace: true,
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

const passwordValidator = [
  checkSchema({
    password: {
      require: true,
      isAlphanumeric: true,
      isLength: {
        options: {
          min: 3,
        },
      },
    },
    new_password: {
      require: true,
      isAlphanumeric: true,
      isLength: {
        options: {
          min: 3,
        },
      },
    },
  }),
  validationErrorHandler,
];

const forgotPasswordValidator = [
  checkSchema({
    email: {
      require: true,
      isEmail: true,
      errorMessage: "Email is required",
    },
  }),
  validationErrorHandler,
];

const resetPasswordValidator = [
  checkSchema({
    token: {
      in: "query",
      require: true,
      isHexadecimal: true,
      isLength: {
        options: {
          min: 128,
          max: 128,
        },
      },
      errorMessage: "Invalid or expired token",
    },
    password: {
      require: true,
      isLength: {
        options: {
          min: 3,
        },
      },
    },
  }),
  validationErrorHandler,
];

const userSchemaValidator = [
  checkSchema({
    first_name: {
      require: true,
      isAlphaWithSpace: true,
      isLength: {
        options: {
          min: 5,
        },
      },
    },
    last_name: {
      optional: {
        options: {
          nullable: true,
        },
      },
      isAlphaWithSpace: true,
      isLength: {
        options: {
          min: 5,
        },
      },
    },
    email: {
      require: true,
      isEmail: true,
    },
    mobile_number: {
      optional: {
        options: {
          nullable: true,
        },
      },
      isMobilePhone: true,
    },
  }),
  validationErrorHandler,
];
module.exports = {
  signinSchemaValidator,
  profileSchemaValidator,
  passwordValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  userSchemaValidator,
};
