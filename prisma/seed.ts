import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const senhaHash = await bcrypt.hash("123456", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@stockflow.com",
    },
    update: {},
    create: {
      nome: "Administrador",
      email: "admin@stockflow.com",
      senha: senhaHash,
      role: "admin",
    },
  });

  console.log("Seed executado com sucesso.");
}

main()
  .catch((error) => {
    console.error("Erro no seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });