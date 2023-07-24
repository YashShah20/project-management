const express = require("express");
const { auth, projectLeadAuth, adminAuth } = require("../middlewares/auth");
const {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  updateProjectStatus,
  getProjectTitles,
  getTasksByProjectId,
  addProjectUsers,
} = require("../controllers/project");
const router = express.Router();

router.get("/", auth, getProjects);
router.get("/titles", auth, getProjectTitles);
router.get("/:project_id(\\d+)/tasks", auth, getTasksByProjectId);
router.get("/:project_id(\\d+)", auth, getProjectById);
router.post("/add", adminAuth, addProject);
router.put("/:project_id(\\d+)/update", projectLeadAuth, updateProject);
router.put(
  "/:project_id(\\d+)/update-status",
  projectLeadAuth,
  updateProjectStatus
);

router.post("/:project_id(\\d+)/add-users", projectLeadAuth, addProjectUsers);

module.exports = router;
