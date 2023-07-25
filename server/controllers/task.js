const pool = require("../connection");
const { getProjectLead } = require("./project");
const getTasks = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { page, per_page } = req.query;

    const tasks = (
      await pool.query(
        `select tasks.* from tasks join task_assignments on tasks.id = task_assignments.task_id where user_id=$1 order by tasks.id offset $2 limit $3`,
        [id, (page - 1) * per_page || 0, per_page || 5]
      )
    ).rows;

    res.send(tasks);
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { task_id } = req.params;

    const [task] = (
      await pool.query(
        `select * from tasks where id = $1 and $2 in (select user_id from project_users where project_id = tasks.project_id)`,
        [task_id, id]
      )
    ).rows;

    const task_assignments = (
      await pool.query(`select * from task_assignments where task_id = $1`, [
        task_id,
      ])
    ).rows;

    const depending_on = (
      await pool.query(
        `select * from tasks where id in (select dependent_task_id from task_dependencies where task_id = $1)`,
        [task_id]
      )
    ).rows;

    const dependent_tasks = (
      await pool.query(
        `select * from tasks where id in (select task_id from task_dependencies where dependent_task_id = $1)`,
        [task_id]
      )
    ).rows;

    if (!task) {
      return res.status(404).send("task not found...");
    }

    res.send({
      ...task,
      task_assignments,
      depending_on,
      dependent_tasks,
    });
  } catch (error) {
    next(error);
  }
};

const addTask = [
  //   async (req, res, next) => {
  //     const { project_id } = req.body;
  //     const { id } = req.user;

  //     const [project_lead] = (await getProjectLead(project_id)).rows;

  //     if (project_lead.id !== id) {
  //       return res.status(403).status("only project lead can add task");
  //     }

  //     next();
  //   },
  async (req, res, next) => {
    try {
      const { title, description, due_date, priority_level, project_id } =
        req.body;
      const DEFAULT_TASK_STATUS = 1;

      const [task] = (
        await pool.query(
          `INSERT INTO tasks(
            title, description, due_date, priority_level, status, project_id)
            VALUES ($1, $2, $3, $4, $5, $6) returning *;`,
          [
            title,
            description,
            due_date,
            priority_level,
            DEFAULT_TASK_STATUS,
            project_id,
          ]
        )
      ).rows;

      res.json(task);
    } catch (error) {
      next(error);
    }
  },
];

const updateTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      due_date,
      priority_level,
      status,
      completion_date,
    } = req.body;
    const { task_id } = req.params;

    const [task] = (
      await pool.query(
        `UPDATE tasks
          SET title=$2, description=$3, due_date=$4, priority_level=$5, status=$6, completion_date=$7
          WHERE id=$1 returning *;`,
        [
          task_id,
          title,
          description,
          due_date,
          priority_level,
          status,
          completion_date,
        ]
      )
    ).rows;

    res.json(task);
  } catch (error) {
    next(error);
  }
};

const addTaskDependencies = async (req, res, next) => {
  try {
    const { task_id } = req.params;
    const { dependeing_on } = req.body;

    Promise.all(
      dependeing_on.map(async (id) => {
        await pool.query(
          `INSERT INTO task_dependencies(
            task_id, dependent_task_id)
            VALUES ($1, $2)`,
          [id, task_id]
        );
      })
    );

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const removeTaskDependency = async (req, res, next) => {
  try {
    const { task_id, dependent_task_id } = req.params;
    pool.query(
      `DELETE FROM task_dependencies
	      WHERE task_id=$1 and dependent_task_id=$2`,
      [task_id, dependent_task_id]
    );
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const assignUser = async (req, res, next) => {
  try {
    const { task_id } = req.params;
    const { user_id, assignment_date } = req.body;

    const [task_assignment] = (
      await pool.query(
        `INSERT INTO task_assignments(
          task_id, user_id, assignment_date)
          VALUES ($1, $2, $3) returning *`,
        [task_id, user_id, assignment_date]
      )
    ).rows;
    res.json(task_assignment);
  } catch (error) {
    next(error);
  }
};

const updateAssignment = async (req, res, next) => {
  try {
    const { assignment_id } = req.params;
    const { assignment_date } = req.body;

    const [task_assignment] = (
      await pool.query(
        `UPDATE task_assignments
          SET assignment_date=$2
          WHERE id=$1 RETURNING *`,
        [assignment_id, assignment_date]
      )
    ).rows;
    res.json(task_assignment);
  } catch (error) {
    next(error);
  }
};

const deleteAssignment = async (req, res, next) => {
  try {
    const { assignment_id } = req.params;

    const [task_assignment] = (
      await pool.query(
        `DELETE FROM task_assignments
          WHERE id=$1 returning *`,
        [assignment_id]
      )
    ).rows;
    res.json(task_assignment);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  addTaskDependencies,
  removeTaskDependency,
  assignUser,
  updateAssignment,
  deleteAssignment,
};
