const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Middleware untuk memeriksa apakah pengguna adalah admin
const isAdmin = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Mengambil token dari header Authorization

  if (!token) {
    return res.status(401).json({
      code: 401,
      status: "error",
      message: "Token tidak ditemukan. Silakan login terlebih dahulu.",
    });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Cari user berdasarkan id dari token yang sudah di-decode
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    // Cek apakah role user adalah admin
    if (user && user.role === "admin") {
      req.user = user; // Simpan user di request untuk digunakan di controller
      next(); // Lanjutkan ke handler rute
    } else {
      return res.status(403).json({
        code: 403,
        status: "error",
        message: "Akses ditolak. Hanya atmin yang memiliki Kitab SUKI.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(403).json({
      code: 403,
      status: "error",
      message: "Token tidak valid atau telah kadaluarsa.",
    });
  }
};

module.exports = { isAdmin };
