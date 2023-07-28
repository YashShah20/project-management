const pool = require("../connection");
const { signToken } = require("../utils/jwt");
const { sendMail } = require("../utils/mail");
const { comparePassword, hashPassword } = require("../utils/password");
const crypto = require("crypto");

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // checking user with given email address exists
    const [user] = (
      await pool.query(
        `select id,email,first_name,last_name,is_admin,password from users where email = $1`,
        [email]
      )
    ).rows;

    console.log(user);

    if (!user) {
      return res.status(403).json(`invalid credentials`);
    }

    // compare password with the stored hash value of the database
    const matched = await comparePassword(password, user.password);

    if (!matched) {
      return res.status(403).json(`invalid credentials`);
    }

    // const projects_as_leader = null;

    // if (!user.is_admin) {
    //   let projects = (
    //     await pool.query(
    //       `select "project_id" from project where "lead_id"=$1`,
    //       [user.id]
    //     )
    //   ).rows;

    //   projects_as_leader = projects.reduce((acc, val) => {
    //     acc.push(val.project_id);
    //     return acc;
    //   }, []);
    // }

    delete user.password;

    // payload = {
    //   ...user,
    //   projects_as_leader,
    // };
    // const token = signToken(payload);
    const token = signToken(user);

    res.json({ token, user });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const [user] = (await pool.query(`select * from users where id = $1`, [id]))
      .rows;

    delete user.password;
    delete user.password_reset_token;

    res.json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { first_name, last_name } = req.body;

    const [user] = (
      await pool.query(
        `UPDATE users
          SET  first_name=$2, last_name=$3
          WHERE id=$1 returning id,first_name,last_name,email,is_admin`,
        [id, first_name, last_name]
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
      const { id } = req.user;
      const { password } = req.body;
      const [user] = (
        await pool.query(`select password from users where id=$1`, [id])
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
      const { id } = req.user;
      const { new_password } = req.body;

      const hashed_password = await hashPassword(new_password);

      const update_count = (
        await pool.query(
          `update users set password=$2 where id=$1 returning id`,
          [id, hashed_password]
        )
      ).rowCount;

      res.json({ success: update_count !== 0 });
    } catch (error) {
      next(error);
    }
  },
];

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = crypto.randomBytes(64).toString("hex");

    const count = (
      await pool.query(
        `update users set password_reset_token=$2 where email=$1`,
        [email, token]
      )
    ).rowCount;

    if (count > 0) {
      const html = `
        <p>
          Your one time link to reset your account password is
          <a href="http://localhost:4200/reset-password?token=${token}">here</a>
        </p>
      `;
      sendMail(email, `Password Reset Request`, { html });
    }
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
        `select id,email from users where password_reset_token=$1`,
        [token]
      )
    ).rows;

    if (!user) {
      return res.status(403).send("invalid password reset token");
    }

    // updating the password
    const hashed_password = await hashPassword(password);

    const update_count = (
      await pool.query(
        `update users set password=$2,password_reset_token=null where id=$1 returning id`,
        [user.id, hashed_password]
      )
    ).rowCount;

    const html = `
      <p>
        Password reset is successful!!
      </p>
    `;

    if (update_count !== 0) {
      sendMail(user.email, `Password Reset Confirmation`, { html });
    }
    res.json({ success: update_count !== 0 });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const { page, per_page } = req.query;
    const users = (
      await pool.query(
        `select id,first_name,last_name,email,mobile_number from users where is_admin=false order by id offset $1 limit $2;`,
        [(page - 1) * per_page || 0, per_page || 5]
      )
    ).rows;

    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const [user] = (
      await pool.query(
        `select id,first_name,last_name,email,mobile_number from users where id=$1;`,
        [user_id]
      )
    ).rows;

    const projects = (
      await pool.query(
        "select id,title from projects where id in (select distinct project_id from project_users where user_id = $1)",
        [user_id]
      )
    ).rows;

    res.json({
      ...user,
      projects,
    });
  } catch (error) {
    next(error);
  }
};
const addUser = async (req, res, next) => {
  try {
    const { first_name, last_name, email, mobile_number } = req.body;
    const password = crypto.randomBytes(16).toString("hex");
    console.log("Password", password);
    const hashed_password = await hashPassword(password);

    const [user] = (
      await pool.query(
        `INSERT INTO users(
          first_name, last_name, email, mobile_number, password)
          VALUES ($1, $2, $3, $4, $5) returning *`,
        [first_name, last_name, email, mobile_number, hashed_password]
      )
    ).rows;
    const html = `
      <h3>Welcome, ${first_name} ${last_name}!!</h3>

      <p>Your account credentials are</p>
      <b>Email</b>: ${email} <br />
      <b>Password</b>: ${password}
    `;

    sendMail(email, `Account Credentials`, { html });
    res.json(user);
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
  getUserById,
  getUsers,
  addUser,
};
