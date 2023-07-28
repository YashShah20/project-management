const express = require("express");
const { adminAuth, auth } = require("../middlewares/auth");
const {
  getRoles,
  addRole,
  updateRole,
  deleteRole,
} = require("../controllers/role");
const { roleSchemaValidator } = require("../validators/role");
const router = express.Router();

router.get("/", auth, getRoles);
router.post("/add", adminAuth, roleSchemaValidator, addRole);
router.put(
  "/:role_id(\\d+)/update",
  adminAuth,
  roleSchemaValidator,
  updateRole
);
router.delete("/:role_id(\\d+)/delete", adminAuth, deleteRole);

module.exports = router;
