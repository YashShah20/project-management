const express = require("express");
const { auth } = require("../middlewares/auth");
const {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  addTaskDependencies,
  removeTaskDependency,
} = require("../controllers/task");
const router = express.Router();

router.get("/", auth, getTasks);
router.get("/:task_id(\\d+)", auth, getTaskById);
router.post("/add", auth, addTask);
router.put("/:task_id(\\d+)/update", auth, updateTask);

router.post("/:task_id(\\d+)/add-dependencies", auth, addTaskDependencies);
router.delete(
  "/:task_id(\\d+)-:dependent_task_id(\\d+)/delete-dependency",
  auth,
  removeTaskDependency
);

module.exports = router;
