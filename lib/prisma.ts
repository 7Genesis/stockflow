import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
  var prisma: PrismaClient | undefined;
  var pgPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL não configurada.");
}

const pool =
  global.pgPool ??
  new Pool({
    connectionString,
  });

if (process.env.NODE_ENV !== "production") {
  global.pgPool = pool;
}

const adapter = new PrismaPg(pool);

const prisma =
  global.prisma ??
  new PrismaClient({
    adapter,
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export { prisma };
export default prisma;