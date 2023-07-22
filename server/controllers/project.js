const pool = require("../connection");
const LEAD_USER_ROLE_ID = 1;
const DEFAULT_ROLE_ID = 1;
const DEFAULT_PROFILE_ID = 1;

const getProjects = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { page, per_page } = req.query;

    const projects = (
      await pool.query(
        `select * from projects where id in (select project_id from project_users where user_id=$1) order by id offset $2 limit $3`,
        [id, (page - 1) * per_page || 0, per_page || 5]
      )
    ).rows;
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { project_id } = req.params;
    const [project] = (
      await pool.query(
        `select * from projects where id=$1 and $2 in (select user_id from project_users where project_id=$1)`,
        [project_id, id]
      )
    ).rows;

    const project_users = (
      await pool.query(
        `select 
          user_id,first_name,last_name,email,mobile_number,
          join_date,is_active,
          user_profiles.title as user_profile_title,
          roles.id as role_id,roles.title as role_title
        from 
          project_users 
            join users 
              on project_users.user_id = users.id
            join user_profiles
              on project_users.profile_id = user_profiles.id  
            join roles
              on project_users.role_id = roles.id                           
        where project_users.project_id = $1`,
        [project_id]
      )
    ).rows;
    if (!project) {
      return res.status(404).send("project not found...");
    }

    res.json({ ...project, project_users });
  } catch (error) {
    next(error);
  }
};

const getProjectTitles = async (req, res, next) => {
  try {
    const project_titles = (await pool.query(`select id,title from projects`))
      .rows;

    res.json(project_titles);
  } catch (error) {
    next(error);
  }
};

const getTasksByProjectId = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { project_id } = req.params;
    const { page, per_page } = req.query;

    const tasks = (
      await pool.query(
        `select * from tasks where project_id = $1 and $2 in (select user_id from project_users where project_id = $1) offset $3 limit $4;`,
        [project_id, id, (page - 1) * per_page || 0, per_page || 5]
      )
    ).rows;

    res.send(tasks);
  } catch (error) {
    next(error);
  }
};

const addProject = async (req, res, next) => {
  try {
    const { title, description, start_date, end_date, lead_id } = req.body;

    const [project] = (
      await pool.query(
        `insert into projects (
          title, description, start_date, end_date)
          values ($1, $2, $3, $4) returning *`,
        [title, description, start_date, end_date]
      )
    ).rows;

    pool.query(
      `INSERT INTO project_users (
        project_id, user_id, role_id, profile_id)
        VALUES ($1, $2, $3, $4)`,
      [project.id, lead_id, DEFAULT_ROLE_ID, DEFAULT_PROFILE_ID]
    );

    res.json(project);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { title, description, start_date, end_date } = req.body;
    const { project_id } = req.params;
    const { id } = req.user;

    const [project] = (
      await pool.query(
        `UPDATE projects
          SET title=$4, description=$5, start_date=$6, end_date=$7
          WHERE id=$1 and (select role_id from project_users where project_id=projects.id and user_id=$2)=$3 returning *;`,
        [
          project_id,
          id,
          LEAD_USER_ROLE_ID,
          title,
          description,
          start_date,
          end_date,
        ]
      )
    ).rows;
    res.json(project);
  } catch (error) {
    next(error);
  }
};

const updateProjectStatus = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { project_id } = req.params;
    const { status } = req.body;

    const LEAD_USER_ROLE_ID = 1;
    const [project] = (
      await pool.query(
        `UPDATE projects
          SET status=$4
          WHERE id=$1 and (select role_id from project_users where project_id=projects.id and user_id=$2)=$3 returning *;`,
        [project_id, id, LEAD_USER_ROLE_ID, status]
      )
    ).rows;

    res.json(project);
  } catch (error) {
    next(error);
  }
};

const getProjectLead = async (project_id) => {
  return pool.query(
    "select user_id from project_users where project_id=$1 and role_id = $2",
    [project_id, LEAD_USER_ROLE_ID]
  );
};

module.exports = {
  getProjects,
  getProjectById,
  getProjectTitles,
  getTasksByProjectId,
  getProjectLead,
  addProject,
  updateProject,
  updateProjectStatus,
};
