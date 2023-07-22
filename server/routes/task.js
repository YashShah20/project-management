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
const router = express.Router();

router.get("/", auth, getTasks);
router.get("/:task_id(\\d+)", auth, getTaskById);
router.post("/add", projectLeadAuth, addTask);
router.put("/:task_id(\\d+)/update", projectLeadAuth, updateTask);

router.post("/:task_id(\\d+)/add-dependencies", auth, addTaskDependencies);
router.delete(
  "/:task_id(\\d+)-:dependent_task_id(\\d+)/delete-dependency",
  projectLeadAuth,
  removeTaskDependency
);

router.post("/:task_id(\\d+)/assign-user", projectLeadAuth, assignUser);
router.put(
  "/:task_id(\\d+)/update-assignment/:assignment_id(\\d+)",
  projectLeadAuth,
  updateAssignment
);
router.delete(
  "/:task_id(\\d+)/delete-assignment/:assignment_id(\\d+)",
  projectLeadAuth,
  deleteAssignment
);
module.exports = router;
