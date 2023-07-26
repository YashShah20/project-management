const express = require("express");
const {
  getUserProfiles,
  addUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userProfiles");
const { adminAuth } = require("../middlewares/auth");
const { userProfileSchemValidator } = require("../validators/userProfile");
const router = express.Router();

router.get("/", adminAuth, getUserProfiles);
router.post("/add", adminAuth, userProfileSchemValidator, addUserProfile);
router.put(
  "/:profile_id(\\d+)/update",
  adminAuth,
  userProfileSchemValidator,
  updateUserProfile
);
router.delete("/:profile_id(\\d+)/delete", adminAuth, deleteUserProfile);

module.exports = router;
