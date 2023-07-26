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
const { paginationValidator } = require("../validators/pagination");
const {
  projectSchemaValidator,
  statusValidator,
  projectUsersSchemaValidator,
} = require("../validators/project");
const router = express.Router();

// http://localhost:3000/project/
router.get("/", auth, paginationValidator, getProjects);
router.get("/titles", auth, getProjectTitles);
router.get(
  "/:project_id(\\d+)/tasks",
  auth,
  paginationValidator,
  getTasksByProjectId
);
router.get("/:project_id(\\d+)", auth, getProjectById);
router.post("/add", adminAuth, projectSchemaValidator, addProject);
router.put(
  "/:project_id(\\d+)/update",
  projectLeadAuth,
  projectSchemaValidator,
  updateProject
);
router.put(
  "/:project_id(\\d+)/update-status",
  projectLeadAuth,
  statusValidator,
  updateProjectStatus
);

router.post(
  "/:project_id(\\d+)/add-users",
  projectLeadAuth,
  projectUsersSchemaValidator,
  addProjectUsers
);

module.exports = router;
