const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  try {
    return bcrypt.hash(password, 10);
  } catch (error) {
    throw error;
  }
};

const comparePassword = (password, hash) => {
  try {
    return bcrypt.compare(password, hash);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
