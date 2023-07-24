const pool = require("../connection");

const LEAD_USER_ROLE_ID = 1;
const getProjectLeadByProjectId = async (project_id) => {
  try {
    // console.log("project_id", project_id);
    const [user] = (
      await pool.query(
        `select user_id from project_users where project_id=$1 and role_id = $2`,
        [project_id, LEAD_USER_ROLE_ID]
      )
    ).rows;

    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
};

const getProjectLeadByTaskId = async (task_id) => {
  try {
    // console.log("task_id", task_id);
    const [user] = (
      await pool.query(
        `select user_id from project_users where project_id=(select project_id from tasks where id=$1) and role_id = $2`,
        [task_id, LEAD_USER_ROLE_ID]
      )
    ).rows;

    console.log("user", user);
    return user;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const getProjectLeadByIssueId = async (issue_id) => {
  try {
    // console.log("issue_id", issue_id);
    const [user] = (
      await pool.query(
        `select user_id from project_users where project_id=(select project_id from issues where id=$1) and role_id = $2`,
        [issue_id, LEAD_USER_ROLE_ID]
      )
    ).rows;

    console.log("user", user);
    return user;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = {
  getProjectLeadByProjectId,
  getProjectLeadByTaskId,
  getProjectLeadByIssueId,
};
