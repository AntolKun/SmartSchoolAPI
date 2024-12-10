const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Cari user berdasarkan username
    const user = await prisma.user.findUnique({
      where: {
        username: username, // Cari berdasarkan username
      },
      include: {
        siswa: true, // Termasuk relasi dengan tabel Siswa
        guru: true, // Termasuk relasi dengan tabel Guru
        admin: true, // Termasuk relasi dengan tabel Admin
      },
    });

    if (!user) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "User tidak ditemukan",
      });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "Password salah",
      });
    }

    // Buat token JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Kembalikan respons dengan semua data yang relevan
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Login berhasil",
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          rememberMe: user.rememberMe,
          siswa: user.siswa ? user.siswa : null, // Relasi ke Siswa (jika ada)
          guru: user.guru ? user.guru : null, // Relasi ke Guru (jika ada)
          admin: user.admin ? user.admin : null, // Relasi ke Admin (jika ada)
        },
        token: token, // JWT Token
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi kesalahan saat login",
    });
  }
};

module.exports = { login };
