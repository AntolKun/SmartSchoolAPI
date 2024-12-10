const express = require("express");
const { addGuru, addMurid } = require("../controllers/adminController");
const router = express.Router();

// Rute untuk menambahkan Guru
router.post("/add-guru", addGuru);

// Rute untuk menambahkan Murid
router.post("/add-murid", addMurid);

module.exports = router;
