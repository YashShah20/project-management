const express = require("express");
const { auth, projectLeadAuth } = require("../middlewares/auth");
const {
  getIssues,
  getIssueById,
  addIssue,
  updateIssue,
  updateIssueStatus,
} = require("../controllers/issue");

const router = express.Router();

router.get("/", auth, getIssues);
router.get("/:issue_id(\\d+)", auth, getIssueById);
router.post("/add", auth, addIssue);
router.put("/:issue_id(\\d+)/update", projectLeadAuth, updateIssue);
router.put(
  "/:issue_id(\\d+)/update-status",
  projectLeadAuth,
  updateIssueStatus
);

module.exports = router;
