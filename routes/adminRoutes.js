const express = require("express");
const { addGuru, addMurid } = require("../controllers/adminController");
const { isAdmin } = require("../middleware/authMiddleware"); // Import middleware
const router = express.Router();

// Rute untuk menambahkan Guru hanya bisa diakses oleh admin
router.get("/")

router.post("/add-guru", isAdmin, addGuru);

// Rute untuk menambahkan Murid hanya bisa diakses oleh admin
router.post("/add-murid", isAdmin, addMurid);

module.exports = router;
