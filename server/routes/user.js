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

const router = express();

router.post("/signin", signin);
router.get("/all", adminAuth, getUsers);
router.post("/add", adminAuth, addUser);
router.get("/profile", auth, getProfile);
router.put("/profile/update", auth, updateProfile);
router.put("/password/update", auth, updatePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
