import "dotenv/config";
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
const email = String(process.env.SUPERADMIN_EMAIL ?? "").trim().toLowerCase();
const senha = String(process.env.SUPERADMIN_SENHA ?? "");
const nome = String(process.env.SUPERADMIN_NOME ?? "Super Admin").trim();

if (!connectionString) {
  throw new Error("DATABASE_URL não configurada.");
}

if (!email || senha.length < 8) {
  throw new Error(
    "Defina SUPERADMIN_EMAIL e SUPERADMIN_SENHA (mínimo de 8 caracteres)."
  );
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const NOME_EMPRESA_PLATAFORMA = "StockFlow (plataforma)";

async function main() {
  // O superadmin não pertence a uma empresa cliente, mas o modelo exige uma.
  let empresa = await prisma.empresa.findFirst({
    where: { nome: NOME_EMPRESA_PLATAFORMA },
  });

  if (!empresa) {
    empresa = await prisma.empresa.create({
      data: { nome: NOME_EMPRESA_PLATAFORMA },
    });
  }

  const existente = await prisma.user.findFirst({
    where: { empresaId: empresa.id, email },
  });

  if (existente) {
    console.log("Já existe um usuário com esse e-mail. Nada foi alterado.");
    return;
  }

  await prisma.user.create({
    data: {
      empresaId: empresa.id,
      nome,
      email,
      senha: await bcrypt.hash(senha, 10),
      role: "superadmin",
    },
  });

  console.log(`Superadmin criado: ${email}`);
}

main()
  .catch((e) => {
    console.error("Erro ao criar o superadmin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
