const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const signToken = (payload) => {
  try {
    return jwt.sign(payload, JWT_SECRET);
  } catch (error) {
    throw error;
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signToken,
  verifyToken,
};
