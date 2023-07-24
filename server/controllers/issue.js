const pool = require("../connection");
const getIssues = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { page, per_page } = req.query;

    const issues = (
      await pool.query(
        `select * from issues where project_id in (select project_id from project_users where user_id = $1) order by id offset $2 limit $3`,
        [id, (page - 1) * per_page || 0, per_page || 5]
      )
    ).rows;
    res.json(issues);
  } catch (error) {
    next(error);
  }
};
const getIssueById = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { issue_id } = req.params;

    const [issue] = (
      await pool.query(
        `select * from issues where id = $1 and  project_id in (select project_id from project_users where user_id = $2)`,
        [issue_id, id]
      )
    ).rows;

    if (!issue) {
      return res.status(404).send("issue not found...");
    }

    res.json(issue);
  } catch (error) {
    next(error);
  }
};
const addIssue = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { title, description, type, severity, status, project_id } = req.body;
    const [issue] = (
      await pool.query(
        `INSERT INTO issues(
        title, description, type, severity, status, reported_by, project_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
        [title, description, type, severity, status, id, project_id]
      )
    ).rows;
    res.json(issue);
  } catch (error) {
    next(error);
  }
};
const updateIssue = async (req, res, next) => {
  try {
    const { issue_id } = req.params;
    const { title, description, type, severity, assigned_to } = req.body;

    const [issue] = (
      await pool.query(
        `UPDATE issues
            SET title=$2, description=$3, type=$4, severity=$5, assigned_to=$6
            WHERE id=$1 RETURNING *;`,
        [issue_id, title, description, type, severity, assigned_to]
      )
    ).rows;

    res.json(issue);
  } catch (error) {
    next(error);
  }
};
const updateIssueStatus = async (req, res, next) => {
  try {
    const { issue_id } = req.params;
    const { status } = req.body;

    const [issue] = (
      await pool.query(
        `UPDATE issues
            SET status=$2
            WHERE id=$1 RETURNING *;`,
        [issue_id, status]
      )
    ).rows;

    res.json(issue);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getIssues,
  getIssueById,
  addIssue,
  updateIssue,
  updateIssueStatus,
};
