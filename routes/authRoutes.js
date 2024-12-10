const express = require("express");
const { login } = require("../controllers/authController");
const router = express.Router();

// Rute untuk login
router.post("/login", login);

module.exports = router;
