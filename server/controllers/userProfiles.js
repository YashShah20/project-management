const pool = require("../connection");

const getUserProfiles = async (req, res, next) => {
  try {
    const user_profiles = (await pool.query("select * from user_profiles;"))
      .rows;
    res.json(user_profiles);
  } catch (error) {
    next(error);
  }
};

const addUserProfile = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const [user_profile] = (
      await pool.query(
        `INSERT INTO user_profiles(
            title, description)
            VALUES ($1, $2) returning *`,
        [title, description]
      )
    ).rows;
    res.json(user_profile);
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const { profile_id } = req.params;
    const { title, description } = req.body;

    const [user_profile] = (
      await pool.query(
        `UPDATE user_profiles
            SET title=$2, description=$3
            WHERE id=$1 returning *`,
        [profile_id, title, description]
      )
    ).rows;
    res.json(user_profile);
  } catch (error) {
    next(error);
  }
};

const deleteUserProfile = async (req, res, next) => {
  try {
    const { profile_id } = req.params;
    const [user_profile] = (
      await pool.query(
        `DELETE FROM user_profiles
            WHERE id=$1 returning *`,
        [profile_id]
      )
    ).rows;
    res.json(user_profile);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProfiles,
  addUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
