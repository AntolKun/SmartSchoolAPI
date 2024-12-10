const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const app = express();

// Memuat variabel lingkungan dari file .env
dotenv.config();

// Middleware untuk parsing JSON request body
app.use(express.json());

// Rute untuk otentikasi
app.use("/api/auth", authRoutes);

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
