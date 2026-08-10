const express = require("express");

console.log("✅ authRoutes loaded");

const router = express.Router();
const {
    registerUser,
    loginUser
} = require("../controllers/authController");

// Test Route
router.get("/test", (req, res) => {
    res.json({
        message: "Auth Route Working"
    });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;