const pool = require("../connection");

const getProjects = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { page, per_page } = req.query;

    const projects = (
      await pool.query(
        `select * from project where "project_id" in (select "project_id" from project_users where "user_id"=$1) order by "project_id" offset $2 limit $3`,
        [user_id, page || 0, per_page || 5]
      )
    ).rows;
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { project_id } = req.params;
    const [project] = (
      await pool.query(
        `select * from project where "project_id"=$1 and $2 in (select "user_id" from project_users where "project_id"=$1)`,
        [project_id, user_id]
      )
    ).rows;

    if (!project) {
      return res.status(404).send("project not found...");
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
};

const addProject = async (req, res, next) => {
  try {
    const {
      project_name,
      description,
      start_date,
      end_date,
      status,
      lead_user_id,
    } = req.body;
    const { user_id } = req.user;

    const [project] = (
      await pool.query(
        `INSERT INTO project(
            "project_name", "description", "start_date", "end_date", "status", "lead_user_id", "created_by")
            VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`,
        [
          project_name,
          description,
          start_date,
          end_date,
          status,
          lead_user_id,
          user_id,
        ]
      )
    ).rows;

    res.json(project);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    res.json("router working!!");
  } catch (error) {
    next(error);
  }
};

const updateProjectStatus = async (req, res, next) => {
  try {
    res.json("router working!!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  updateProjectStatus,
};
