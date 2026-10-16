import { prisma } from "@/lib/prisma";

const TABELAS = [
  "AuditLog",
  "NfeImportItem",
  "NfeImport",
  "Solicitacao",
  "StockMovement",
  "Product",
  "Fornecedor",
  "UserInvite",
  "PagamentoSaas",
  "Assinatura",
  "User",
  "Empresa",
];

export async function limparBanco() {
  const lista = TABELAS.map((t) => `"${t}"`).join(", ");
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${lista} RESTART IDENTITY CASCADE`);
}

export async function desconectar() {
  await prisma.$disconnect();
}

let contador = 0;
const proximo = () => String(++contador);

export async function criarEmpresa(nome = "Empresa Teste") {
  return prisma.empresa.create({
    data: { nome: `${nome} ${proximo()}` },
  });
}

export async function criarUsuario(
  empresaId: string,
  role: "admin" | "user" | "superadmin" = "user"
) {
  const n = proximo();
  return prisma.user.create({
    data: {
      empresaId,
      nome: `Usuário ${n}`,
      email: `usuario${n}@teste.com`,
      senha: "hash-qualquer",
      role,
    },
  });
}

export async function criarProduto(
  empresaId: string,
  dados: { nome?: string; estoqueAtual?: number } = {}
) {
  return prisma.product.create({
    data: {
      empresaId,
      nome: dados.nome ?? `Produto ${proximo()}`,
      estoqueAtual: dados.estoqueAtual ?? 0,
    },
  });
}
