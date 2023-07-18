const express = require("express");
const {
  signin,
  getProfile,
  updatePassword,
  updateProfile,
  forgotPassword,
  resetPassword,
} = require("../controllers/user");
const { auth } = require("../middlewares/auth");

const router = express();

router.post("/signin", signin);
router.get("/profile", auth, getProfile);
router.put("/profile/update", auth, updateProfile);
router.put("/password/update", auth, updatePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
