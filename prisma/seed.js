const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  // Buat data User
  const userAdmin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      username: "adminuser",
      password: await bcrypt.hash("adminpassword", 10),
      role: "admin",
    },
  });

  const userGuru = await prisma.user.create({
    data: {
      email: "guru@example.com",
      username: "guruser",
      password: await bcrypt.hash("gurupassword", 10),
      role: "guru",
    },
  });

  // Buat data Admin dan Guru yang berelasi dengan User
  await prisma.admin.create({
    data: {
      userId: userAdmin.id,
      nama: "Ibu Helen",
    },
  });

  await prisma.guru.create({
    data: {
      userId: userGuru.id,
      nama: "Bapak Tolo",
    },
  });

  // Buat data Siswa yang berelasi dengan User
  const siswa = await prisma.user.create({
    data: {
      email: "siswa@example.com",
      username: "siswauser",
      password: await bcrypt.hash("siswapassword", 10),
      role: "siswa",
    },
  });

  await prisma.siswa.create({
    data: {
      userId: siswa.id,
      nama: "Rifki apalah",
      kelas: "10 RPL 1",
    },
  });

  console.log("Seeding selesai!");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
