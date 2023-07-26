const { checkSchema } = require("express-validator");
const { validationErrorHandler } = require("./validationErrorHandler");
const { getProjectLeadByProjectId } = require("../utils/project");
const pool = require("../connection");

const taskSchemaValidator = [
  checkSchema({
    title: {
      require: true,
      isAlphaWithSpace: true,
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
          max: 250,
        },
      },
    },
    completion_date: {
      optional: {
        options: {
          nullable: true,
        },
      },
      isISO8601: true,
      toDate: true,
    },
    due_date: {
      require: true,
      isISO8601: true,
      toDate: true,
    },
    priority_level: {
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
      default: 1,
      isInt: {
        options: {
          min: 1,
          max: 5,
        },
      },
      toInt: true,
    },
    project_id: {
      require: {
        bail: true,
      },
      isInt: {
        options: {
          min: 1,
        },
        bail: true,
      },
      custom: {
        options: async (value, { req }) => {
          const user = req.user;
          const lead = await getProjectLeadByProjectId(value);

          if (user.id === lead?.user_id) {
            return Promise.resolve();
          }

          return Promise.reject("only project lead can add tasks");
        },
      },
    },
  }),
  validationErrorHandler,
];

const taskDependenciesSchemaValidator = [
  checkSchema({
    dependeing_on: {
      isArray: true,
      bail: true,
    },
    "dependeing_on.*": {
      isInt: {
        options: {
          min: 1,
        },
      },
      toInt: true,
      custom: {
        options: async (value, { req }) => {
          const { task_id } = req.params;

          if (value == task_id) {
            return Promise.reject("task can not depent on itself");
          }

          const [result] = (
            await pool.query(
              `select count(*) as count from task_dependencies where task_id=$1 and dependent_task_id=$2`,
              [task_id, value]
            )
          ).rows;

          console.log(result.count);

          const is_cycle = result.count != 0;
          if (!is_cycle) {
            return Promise.resolve();
          }

          return Promise.reject("cycle detected in task dependencies");
        },
      },
    },
  }),
  validationErrorHandler,
];

const taskUserSchemaValidator = [
  checkSchema({
    user_id: {
      require: true,
      isInt: {
        options: {
          min: 1,
        },
      },
      toInt: true,
    },
    assignment_date: {
      require: true,
      isISO8601: true,
      toDate: true,
    },
  }),
  validationErrorHandler,
];
module.exports = {
  taskSchemaValidator,
  taskDependenciesSchemaValidator,
  taskUserSchemaValidator,
};
