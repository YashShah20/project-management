const express = require("express");
const { auth, projectLeadAuth } = require("../middlewares/auth");
const {
  getIssues,
  getIssueById,
  addIssue,
  updateIssue,
  updateIssueStatus,
} = require("../controllers/issue");
const { paginationValidator } = require("../validators/pagination");
const {
  issueSchemaValidator,
  issueStatusValidator,
} = require("../validators/issue");

const router = express.Router();

router.get("/", auth, paginationValidator, getIssues);
router.get("/:issue_id(\\d+)", auth, getIssueById);
router.post("/add", auth, issueSchemaValidator, addIssue);
router.put(
  "/:issue_id(\\d+)/update",
  projectLeadAuth,
  issueSchemaValidator,
  updateIssue
);
router.put(
  "/:issue_id(\\d+)/update-status",
  projectLeadAuth,
  issueStatusValidator,
  updateIssueStatus
);

module.exports = router;
