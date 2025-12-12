const express = require("express");
const { registerUser, loginUser, getMe, updateUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authmiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/update-profile", protect, updateUserProfile);

module.exports = router;
