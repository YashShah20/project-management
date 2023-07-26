const { checkSchema } = require("express-validator");

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 3;

const paginationValidator = checkSchema({
  page: {
    in: "query",
    customSanitizer: {
      options: (value) => {
        return parseInt(value) || DEFAULT_PAGE;
      },
    },
  },
  per_page: {
    in: "query",
    customSanitizer: {
      options: (value) => {
        return parseInt(value) || DEFAULT_PER_PAGE;
      },
    },
  },
});

module.exports = {
  paginationValidator,
};
