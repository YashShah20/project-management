const { checkSchema } = require("express-validator");
const { validationErrorHandler } = require("./validationErrorHandler");

const issueSchemaValidator = [
  checkSchema({
    title: {
      require: true,
      isAlphaNumericWithSpace: true,
      isLength: {
        options: {
          min: 5,
          max: 100,
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
          max: 500,
        },
      },
    },
    type: {
      require: true,
      isInt: {
        options: {
          min: 1,
          max: 10,
        },
      },
      toInt: true,
    },
    severity: {
      require: true,
      isInt: {
        options: {
          min: 1,
          max: 10,
        },
      },
      toInt: true,
    },
    status: {
      require: true,
      isInt: {
        options: {
          min: 0,
          max: 5,
        },
      },
      toInt: true,
    },
    assigned_to: {
      optional: {
        options: {
          nullable: true,
        },
      },
      isInt: {
        options: {
          min: 1,
          max: 10,
        },
      },
      toInt: true,
    },
    project_id: {
      require: true,
      isInt: {
        options: {
          min: 1,
        },
      },
      toInt: true,
    },
  }),
  validationErrorHandler,
];

const issueStatusValidator = [
  checkSchema({
    status: {
      require: true,
      isInt: {
        options: {
          min: 0,
          max: 5,
        },
      },
      toInt: true,
    },
  }),
];
module.exports = {
  issueSchemaValidator,issueStatusValidator
};
