/*
  Warnings:

  - Added the required column `empresaId` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresaId` to the `NfeImport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresaId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresaId` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresaId` to the `StockMovement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresaId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fornecedor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "empresaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Fornecedor_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Fornecedor" ("cnpj", "createdAt", "id", "nome") SELECT "cnpj", "createdAt", "id", "nome" FROM "Fornecedor";
DROP TABLE "Fornecedor";
ALTER TABLE "new_Fornecedor" RENAME TO "Fornecedor";
CREATE UNIQUE INDEX "Fornecedor_empresaId_cnpj_key" ON "Fornecedor"("empresaId", "cnpj");
CREATE TABLE "new_NfeImport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "empresaId" TEXT NOT NULL,
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
    CONSTRAINT "NfeImport_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "NfeImport_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_NfeImport" ("chaveAcesso", "cnpjFornecedor", "createdAt", "dataEmissao", "fornecedor", "fornecedorId", "id", "numeroNota", "serie", "valorTotal", "xmlOriginal") SELECT "chaveAcesso", "cnpjFornecedor", "createdAt", "dataEmissao", "fornecedor", "fornecedorId", "id", "numeroNota", "serie", "valorTotal", "xmlOriginal" FROM "NfeImport";
DROP TABLE "NfeImport";
ALTER TABLE "new_NfeImport" RENAME TO "NfeImport";
CREATE UNIQUE INDEX "NfeImport_empresaId_chaveAcesso_key" ON "NfeImport"("empresaId", "chaveAcesso");
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "empresaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sku" TEXT,
    "codigoBarras" TEXT,
    "categoria" TEXT,
    "custo" REAL,
    "preco" REAL,
    "estoqueAtual" REAL NOT NULL DEFAULT 0,
    "estoqueMinimo" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Product_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("categoria", "codigoBarras", "createdAt", "custo", "estoqueAtual", "estoqueMinimo", "id", "nome", "preco", "sku") SELECT "categoria", "codigoBarras", "createdAt", "custo", "estoqueAtual", "estoqueMinimo", "id", "nome", "preco", "sku" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_empresaId_sku_key" ON "Product"("empresaId", "sku");
CREATE UNIQUE INDEX "Product_empresaId_codigoBarras_key" ON "Product"("empresaId", "codigoBarras");
CREATE TABLE "new_Solicitacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "empresaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantidade" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Solicitacao_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Solicitacao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Solicitacao_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Solicitacao" ("createdAt", "id", "productId", "quantidade", "status", "userId") SELECT "createdAt", "id", "productId", "quantidade", "status", "userId" FROM "Solicitacao";
DROP TABLE "Solicitacao";
ALTER TABLE "new_Solicitacao" RENAME TO "Solicitacao";
CREATE TABLE "new_StockMovement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "empresaId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "quantidade" REAL NOT NULL,
    "observacao" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StockMovement_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StockMovement_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_StockMovement" ("createdAt", "id", "observacao", "productId", "quantidade", "tipo") SELECT "createdAt", "id", "observacao", "productId", "quantidade", "tipo" FROM "StockMovement";
DROP TABLE "StockMovement";
ALTER TABLE "new_StockMovement" RENAME TO "StockMovement";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "empresaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "email", "id", "nome", "role", "senha") SELECT "createdAt", "email", "id", "nome", "role", "senha" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_empresaId_email_key" ON "User"("empresaId", "email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpj_key" ON "Empresa"("cnpj");
