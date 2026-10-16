import { testDatabaseUrl } from "./test-database";

// lib/prisma.ts lê DATABASE_URL no momento do import.
process.env.DATABASE_URL = testDatabaseUrl();
