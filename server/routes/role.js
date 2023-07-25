const express = require("express");
const { adminAuth } = require("../middlewares/auth");
const {
  getRoles,
  addRole,
  updateRole,
  deleteRole,
} = require("../controllers/role");
const router = express.Router();

router.get("/", adminAuth, getRoles);
router.post("/add", adminAuth, addRole);
router.put("/:role_id(\\d+)/update", adminAuth, updateRole);
router.delete("/:role_id(\\d+)/delete", adminAuth, deleteRole);

module.exports = router;
