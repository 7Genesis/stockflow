import "dotenv/config";
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL não configurada.");
}

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const senhaAdminHash = await bcrypt.hash("123456", 10);
  const senhaUserHash = await bcrypt.hash("123456", 10);

  const documentoEmpresa = "00000000000191";

  const empresa = await prisma.empresa.upsert({
    where: {
      documento: documentoEmpresa,
    },
    update: {},
    create: {
      nome: "Empresa Demo",
      tipoDocumento: "cnpj",
      documento: documentoEmpresa,
    },
  });

  const adminExistente = await prisma.user.findFirst({
    where: {
      empresaId: empresa.id,
      email: "admin@stockflow.com",
    },
  });

  if (!adminExistente) {
    await prisma.user.create({
      data: {
        empresaId: empresa.id,
        nome: "Administrador",
        email: "admin@stockflow.com",
        senha: senhaAdminHash,
        role: "admin",
      },
    });
  }

  const userExistente = await prisma.user.findFirst({
    where: {
      empresaId: empresa.id,
      email: "user@stockflow.com",
    },
  });

  if (!userExistente) {
    await prisma.user.create({
      data: {
        empresaId: empresa.id,
        nome: "Usuário Teste",
        email: "user@stockflow.com",
        senha: senhaUserHash,
        role: "user",
      },
    });
  }

  console.log("Seed executado com sucesso.");
}

main()
  .catch((e) => {
    console.error("Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });