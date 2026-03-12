-- CreateTable
CREATE TABLE "NfeImport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chaveAcesso" TEXT NOT NULL,
    "numeroNota" TEXT,
    "serie" TEXT,
    "fornecedor" TEXT,
    "cnpjFornecedor" TEXT,
    "dataEmissao" DATETIME,
    "valorTotal" REAL,
    "xmlOriginal" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "NfeImportItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nfeImportId" TEXT NOT NULL,
    "productId" TEXT,
    "codigo" TEXT,
    "codigoBarras" TEXT,
    "descricao" TEXT NOT NULL,
    "quantidade" REAL NOT NULL,
    "valorUnitario" REAL,
    "ncm" TEXT,
    "cfop" TEXT,
    "unidade" TEXT,
    CONSTRAINT "NfeImportItem_nfeImportId_fkey" FOREIGN KEY ("nfeImportId") REFERENCES "NfeImport" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "NfeImportItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "NfeImport_chaveAcesso_key" ON "NfeImport"("chaveAcesso");
