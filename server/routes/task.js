const express = require("express");
const { auth, projectLeadAuth } = require("../middlewares/auth");
const {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  addTaskDependencies,
  removeTaskDependency,
  assignUser,
  deleteAssignment,
  updateAssignment,
} = require("../controllers/task");
const { paginationValidator } = require("../validators/pagination");
const {
  taskSchemaValidator,
  taskDependenciesSchemaValidator,
  taskUserSchemaValidator,
} = require("../validators/task");
const router = express.Router();

router.get("/", auth, paginationValidator, getTasks);
router.get("/:task_id(\\d+)", auth, getTaskById);
router.post("/add", auth, taskSchemaValidator, addTask);
router.put(
  "/:task_id(\\d+)/update",
  projectLeadAuth,
  taskSchemaValidator,
  updateTask
);

router.post(
  "/:task_id(\\d+)/add-dependencies",
  projectLeadAuth,
  taskDependenciesSchemaValidator,
  addTaskDependencies
);

router.delete(
  "/:task_id(\\d+)-:dependent_task_id(\\d+)/delete-dependency",
  projectLeadAuth,
  removeTaskDependency
);

router.post(
  "/:task_id(\\d+)/assign-user",
  projectLeadAuth,
  taskUserSchemaValidator,
  assignUser
);

router.put(
  "/:task_id(\\d+)/update-assignment/:assignment_id(\\d+)",
  projectLeadAuth,
  taskUserSchemaValidator,
  updateAssignment
);
router.delete(
  "/:task_id(\\d+)/delete-assignment/:assignment_id(\\d+)",
  projectLeadAuth,
  deleteAssignment
);
module.exports = router;
