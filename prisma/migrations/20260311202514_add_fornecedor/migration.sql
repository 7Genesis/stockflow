-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NfeImport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chaveAcesso" TEXT NOT NULL,
    "numeroNota" TEXT,
    "serie" TEXT,
    "fornecedor" TEXT,
    "cnpjFornecedor" TEXT,
    "fornecedorId" TEXT,
    "dataEmissao" DATETIME,
    "valorTotal" REAL,
    "xmlOriginal" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "NfeImport_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_NfeImport" ("chaveAcesso", "cnpjFornecedor", "createdAt", "dataEmissao", "fornecedor", "id", "numeroNota", "serie", "valorTotal", "xmlOriginal") SELECT "chaveAcesso", "cnpjFornecedor", "createdAt", "dataEmissao", "fornecedor", "id", "numeroNota", "serie", "valorTotal", "xmlOriginal" FROM "NfeImport";
DROP TABLE "NfeImport";
ALTER TABLE "new_NfeImport" RENAME TO "NfeImport";
CREATE UNIQUE INDEX "NfeImport_chaveAcesso_key" ON "NfeImport"("chaveAcesso");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_cnpj_key" ON "Fornecedor"("cnpj");
