const express = require("express");
const {
  signin,
  getProfile,
  updatePassword,
  updateProfile,
  forgotPassword,
  resetPassword,
  getUsers,
  addUser,
} = require("../controllers/user");
const { auth, adminAuth } = require("../middlewares/auth");
const {
  signinSchemaValidator,
  profileSchemaValidator,
} = require("../validators/user");

const router = express();

router.post("/signin", signinSchemaValidator, signin);
router.get("/all", auth, getUsers);
router.post("/add", adminAuth, addUser);
router.get("/profile", auth, getProfile);
router.put("/profile/update", auth, profileSchemaValidator, updateProfile);
router.put("/password/update", auth, updatePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
