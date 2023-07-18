const { verifyToken } = require("../utils/jwt");

const auth = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");
    const user = verifyToken(token);

    if (!user) {
      return res.status(403).send("auth failed...");
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).send("auth failed...");
  }
};

const adminAuth = [
  auth,
  async (req, res, next) => {
    const isAdmin = req.user.isAdmin;
    if (isAdmin) {
      next();
    }

    return res.status(403).send("admin auth failed...");
  },
];

module.exports = {
  auth,
  adminAuth,
};
