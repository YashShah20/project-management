const { log } = require("console");
const pool = require("../connection");
const { signToken } = require("../utils/jwt");
const { comparePassword, hashPassword } = require("../utils/password");
const crypto = require("crypto");

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // checking user with given email address exists
    const [user] = (
      await pool.query(`select * from users where email = $1`, [email])
    ).rows;

    console.log(user);

    if (!user) {
      return res.status(403).json(`invalid credentials`);
    }

    // compare password with the stored hash value of the database
    const matched = await conext(error);
    mparePassword(password, user.password);

    if (!matched) {
      return res.status(403).json(`invalid credentials`);
    }

    const projectsAsLeader = null;

    if (!user.isAdmin) {
      let projects = (
        await pool.query(
          `select "projectId" from project where "leadUserId"=$1`,
          [user.userId]
        )
      ).rows;

      projectsAsLeader = projects.reduce((acc, val) => {
        acc.push(val.projectId);
        return acc;
      }, []);
    }

    delete user.password;
    delete user.createdAt;
    delete user.createdBy;
    delete user.lastModifiedAt;
    delete user.lastModifiedBy;

    payload = {
      ...user,
      projectsAsLeader,
    };
    const token = signToken(payload);

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { userId } = req.user;
    console.log(req.user);
    const [user] = (
      await pool.query(`select * from users where "userId" = $1`, [userId])
    ).rows;
    console.log(user);

    delete user.password;
    delete user.createdAt;
    delete user.lastModifiedAt;

    res.json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { firstName, lastName, userName } = req.body;

    const [user] = (
      await pool.query(
        `UPDATE public.users
          SET  "firstName"=$2, "lastName"=$3, "userName"=$4
          WHERE "userId"=$1 returning "userId","firstName","lastName","userName","email","isAdmin"`,
        [userId, firstName, lastName, userName]
      )
    ).rows;
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updatePassword = [
  // validating old password
  async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { password } = req.body;
      const [user] = (
        await pool.query(`select password from users where "userId"=$1`, [
          userId,
        ])
      ).rows;

      const matched = await comparePassword(password, user.password);

      if (!matched) {
        return res.status(403).send(`invalid password`);
      }
      next();
    } catch (error) {
      next(error);
    }
  },
  // updating the password
  async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { newPassword } = req.body;

      const hashedPassword = await hashPassword(newPassword);

      const updateCount = (
        await pool.query(
          `update users set "password"=$2 where "userId"=$1 returning "userId"`,
          [userId, hashedPassword]
        )
      ).rowCount;

      res.json({ success: updateCount !== 0 });
    } catch (error) {
      next(error);
    }
  },
];

const forgotPassword = (req, res, next) => {
  try {
    const { email } = req.body;
    const token = crypto.randomBytes(64).toString("hex");

    pool.query(`update users set "passwordResetToken"=$2 where "email"=$1`, [
      email,
      token,
    ]);

    console.log(token);

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { token } = req.query;

    // validating token exists in the database
    const [user] = (
      await pool.query(
        `select "userId" from users where "passwordResetToken"=$1`,
        [token]
      )
    ).rows;

    if (!user) {
      return res.status(403).send("invalid password reset token");
    }

    // updating the password
    const hashedPassword = await hashPassword(password);

    const updateCount = (
      await pool.query(
        `update users set "password"=$2,"passwordResetToken"=null where "userId"=$1 returning "userId"`,
        [user.userId, hashedPassword]
      )
    ).rowCount;

    res.json({ success: updateCount !== 0 });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signin,
  getProfile,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword,
};
