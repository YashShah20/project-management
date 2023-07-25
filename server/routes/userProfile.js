const express = require("express");
const {
  getUserProfiles,
  addUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userProfiles");
const { adminAuth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", adminAuth, getUserProfiles);
router.post("/add", adminAuth, addUserProfile);
router.put("/:profile_id(\\d+)/update", adminAuth, updateUserProfile);
router.delete("/:profile_id(\\d+)/delete", adminAuth, deleteUserProfile);

module.exports = router;
