const express = require("express");
const { registerUser, loginUser, getUserProfile, getUsers } = require("../controllers/userControllers");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.get("/", protect, getUsers); // Admin route to get all users

module.exports = router;
