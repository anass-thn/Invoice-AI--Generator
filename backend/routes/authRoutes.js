const express = require("express");
const { registerUser, loginUser, getMe, updateUserProfile } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authmiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe);
router.put("/update-profile", authMiddleware, updateUserProfile);

module.exports = router;
