const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

// Fungsi untuk menambahkan Guru
const addGuru = async (req, res) => {
  const { username, email, password, nama } = req.body;

  try {
    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Membuat user baru dengan role 'guru'
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        role: "guru",
      },
    });

    // Menambahkan data guru
    const guru = await prisma.guru.create({
      data: {
        userId: user.id,
        nama: nama,
      },
    });

    return res.status(201).json({
      code: 201,
      status: "success",
      message: "Guru berhasil ditambahkan",
      data: guru,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi kesalahan saat menambahkan guru",
    });
  }
};

// Fungsi untuk menambahkan Murid
const addMurid = async (req, res) => {
  const { username, email, password, nama, kelas } = req.body;

  try {
    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Membuat user baru dengan role 'siswa'
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        role: "siswa",
      },
    });

    // Menambahkan data siswa
    const siswa = await prisma.siswa.create({
      data: {
        userId: user.id,
        nama: nama,
        kelas: kelas,
      },
    });

    return res.status(201).json({
      code: 201,
      status: "success",
      message: "Murid berhasil ditambahkan",
      data: siswa,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi kesalahan saat menambahkan murid",
    });
  }
};

module.exports = { addGuru, addMurid };
