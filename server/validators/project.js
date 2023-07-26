const { checkSchema } = require("express-validator");
const { validationErrorHandler } = require("./validationErrorHandler");
const pool = require("../connection");

const projectSchemaValidator = [
  checkSchema({
    title: {
      require: true,
      isAlphanumeric: true,
      isLength: {
        options: {
          min: 5,
        },
      },
    },
    description: {
      optional: {
        options: {
          nullable: true,
        },
      },
      escape: true,
      isLength: {
        options: {
          min: 5,
          max: 300,
        },
      },
    },
    start_date: {
      require: true,
      toDate: true,
      isISO8601: true, // ISO date format
    },
    end_date: {
      optional: {
        options: {
          nullable: true,
        },
      },
      toDate: true,
      isISO8601: true, // ISO date format
      custom: {
        options: (value, { req }) => {
          return value > req.body?.start_date;
        },
      },
    },
    status: {
      optional: {
        options: {
          nullable: true,
        },
      },
      isInt: {
        options: {
          min: 0,
          max: 5,
        },
      },
      default: {
        value: 0,
      },
    },
    lead_id: {
      require: true,
      isInt: {
        options: {
          min: 1,
        },
      },
    },
  }),
  validationErrorHandler,
];

const statusValidator = [
  checkSchema({
    status: {
      require: true,
      isInt: {
        options: {
          min: 0,
          max: 5,
        },
      },
    },
  }),
  validationErrorHandler,
];

const projectUsersSchemaValidator = [
  checkSchema({
    users: {
      isArray: true,
    },
    "users.*.user_id": {
      require: true,
      isInt: {
        options: {
          min: 1,
        },
      },
    },
    "users.*.role_id": {
      require: true,
      isInt: {
        options: {
          min: 2,
        },
      },
    },
    "users.*.profile_id": {
      require: true,
      isInt: {
        options: {
          min: 1,
        },
      },
    },
    "users.*.join_date": {
      require: true,
      toDate: true,
      isISO8601: true, // ISO date
      bail: true,
      custom: {
        options: async (value, { req }) => {
          const { project_id } = req.params;
          const [project] = (
            await pool.query("select * from projects where id = $1", [
              project_id,
            ])
          ).rows;

          if (
            value >= project.start_date &&
            (!project.end_date || value <= project.end_date)
          ) {
            return Promise.resolve();
          } else {
            return Promise.reject(
              "user can not join before project start date"
            );
          }
        },
      },
    },
  }),
  validationErrorHandler,
];
module.exports = {
  projectSchemaValidator,
  statusValidator,
  projectUsersSchemaValidator,
};
