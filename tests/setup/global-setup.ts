import { execSync } from "node:child_process";
import { Client } from "pg";
import { testDatabaseUrl } from "./test-database";

// Recria o schema do banco de teste a partir do prisma/schema.prisma.
// Usa `prisma db push` (e não `migrate deploy`) porque as migrations versionadas
// em prisma/migrations estão em dialeto SQLite e não rodam em PostgreSQL.
// Por segurança, recusa rodar contra um banco cujo nome não termine em "_test".
export default async function globalSetup() {
  const url = testDatabaseUrl();
  const dbName = new URL(url).pathname.replace("/", "");

  if (!dbName.endsWith("_test")) {
    throw new Error(
      `TEST_DATABASE_URL deve apontar para um banco que termine em "_test" (recebido: "${dbName}"). ` +
        "A suíte apaga e recria todas as tabelas."
    );
  }

  const client = new Client({ connectionString: url });
  await client.connect();
  try {
    await client.query("DROP SCHEMA IF EXISTS public CASCADE");
    await client.query("CREATE SCHEMA public");
  } finally {
    await client.end();
  }

  try {
    execSync("npx prisma db push", {
      stdio: "pipe",
      encoding: "utf8",
      env: { ...process.env, DATABASE_URL: url },
    });
  } catch (error) {
    const { stdout, stderr } = error as { stdout?: string; stderr?: string };
    throw new Error(`prisma db push falhou:\n${stdout ?? ""}${stderr ?? ""}`);
  }
}
