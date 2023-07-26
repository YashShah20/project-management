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
  passwordValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  userSchemaValidator,
} = require("../validators/user");
const { paginationValidator } = require("../validators/pagination");

const router = express();

router.post("/signin", signinSchemaValidator, signin);
router.get("/all", auth, paginationValidator, getUsers);
router.post("/add", adminAuth, userSchemaValidator, addUser);
router.get("/profile", auth, getProfile);
router.put("/profile/update", auth, profileSchemaValidator, updateProfile);
router.put("/password/update", auth, passwordValidator, updatePassword);
router.post("/forgot-password", forgotPasswordValidator, forgotPassword);
router.post("/reset-password", resetPasswordValidator, resetPassword);

module.exports = router;
