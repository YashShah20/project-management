const pool = require("../connection");

const getRoles = async (req, res, next) => {
  try {
    const roles = (await pool.query("select * from roles;")).rows;
    res.json(roles);
  } catch (error) {
    next(error);
  }
};

const addRole = async (req, res, next) => {
  try {
    const { title, access_level } = req.body;

    const [role] = (
      await pool.query(
        `INSERT INTO roles(
            title, access_level)
            VALUES ($1, $2) returning *`,
        [title, access_level]
      )
    ).rows;
    res.json(role);
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const { role_id } = req.params;
    const { title, access_level } = req.body;

    const [role] = (
      await pool.query(
        `UPDATE roles
            SET title=$2, access_level=$3
            WHERE id=$1 returning *`,
        [role_id, title, access_level]
      )
    ).rows;
    res.json(role);
  } catch (error) {
    next(error);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const { role_id } = req.params;
    const [role] = (
      await pool.query(
        `DELETE FROM roles
            WHERE id=$1 returning *`,
        [role_id]
      )
    ).rows;
    res.json(role);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRoles,
  addRole,
  updateRole,
  deleteRole,
};
