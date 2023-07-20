const express = require("express");
const { auth } = require("../middlewares/auth");
const {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  updateProjectStatus,
} = require("../controllers/project");
const router = express.Router();

router.get("/", auth, getProjects);
router.get("/:projectId(\\d+)", auth, getProjectById);
router.post("/add", auth, addProject);
router.put("/:projectId(\\d+)/update", auth, updateProject);
router.put("/:projectId(\\d+)/update-status", auth, updateProjectStatus);

module.exports = router;
