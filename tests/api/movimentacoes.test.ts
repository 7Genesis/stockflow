import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { prisma } from "@/lib/prisma";
import { GET, POST } from "@/app/api/movimentacoes/route";
import { criarEmpresa, criarProduto, criarUsuario, desconectar, limparBanco } from "../helpers/db";
import { jsonRequest, logarComo } from "../helpers/session";

vi.mock("@/lib/session", () => ({ getSessionUser: vi.fn() }));

beforeEach(async () => {
  await limparBanco();
  await logarComo(null);
});
afterAll(desconectar);

async function cenario() {
  const empresa = await criarEmpresa();
  const usuario = await criarUsuario(empresa.id, "admin");
  const produto = await criarProduto(empresa.id, { estoqueAtual: 10 });
  await logarComo(usuario);
  return { empresa, usuario, produto };
}

const estoqueDe = async (id: string) =>
  (await prisma.product.findUniqueOrThrow({ where: { id } })).estoqueAtual;

describe("POST /api/movimentacoes", () => {
  it("exige sessão", async () => {
    const res = await POST(jsonRequest("/api/movimentacoes", "POST", {}));

    expect(res.status).toBe(401);
  });

  it("entrada soma ao estoque e grava a movimentação e a auditoria", async () => {
    const { produto, usuario } = await cenario();

    const res = await POST(
      jsonRequest("/api/movimentacoes", "POST", { productId: produto.id, tipo: "entrada", quantidade: 5 })
    );

    expect(res.status).toBe(200);
    expect(await estoqueDe(produto.id)).toBe(15);
    const movs = await prisma.stockMovement.findMany({ where: { productId: produto.id } });
    expect(movs).toHaveLength(1);
    expect(movs[0]).toMatchObject({ tipo: "entrada", quantidade: 5 });
    const auditoria = await prisma.auditLog.findMany({ where: { userId: usuario.id } });
    expect(auditoria).toHaveLength(1);
    expect(auditoria[0]).toMatchObject({ acao: "criar", entidade: "movimentacao" });
  });

  it("saída subtrai do estoque, inclusive quantidade fracionada", async () => {
    const { produto } = await cenario();

    const res = await POST(
      jsonRequest("/api/movimentacoes", "POST", { productId: produto.id, tipo: "saida", quantidade: "2.5" })
    );

    expect(res.status).toBe(200);
    expect(await estoqueDe(produto.id)).toBe(7.5);
  });

  it("aceita saída que zera o estoque", async () => {
    const { produto } = await cenario();

    const res = await POST(
      jsonRequest("/api/movimentacoes", "POST", { productId: produto.id, tipo: "saida", quantidade: 10 })
    );

    expect(res.status).toBe(200);
    expect(await estoqueDe(produto.id)).toBe(0);
  });

  it("recusa saída maior que o estoque e não grava nada", async () => {
    const { produto } = await cenario();

    const res = await POST(
      jsonRequest("/api/movimentacoes", "POST", { productId: produto.id, tipo: "saida", quantidade: 11 })
    );

    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("Estoque insuficiente para saída");
    expect(await estoqueDe(produto.id)).toBe(10);
    expect(await prisma.stockMovement.count()).toBe(0);
  });

  it.each([
    ["tipo inválido", { tipo: "transferencia", quantidade: 1 }, 400],
    ["quantidade zero", { tipo: "entrada", quantidade: 0 }, 400],
    ["quantidade negativa", { tipo: "entrada", quantidade: -3 }, 400],
    ["quantidade não numérica", { tipo: "entrada", quantidade: "abc" }, 400],
  ])("recusa %s", async (_caso, corpo, status) => {
    const { produto } = await cenario();

    const res = await POST(jsonRequest("/api/movimentacoes", "POST", { productId: produto.id, ...corpo }));

    expect(res.status).toBe(status);
    expect(await estoqueDe(produto.id)).toBe(10);
  });

  it("não movimenta produto de outra empresa", async () => {
    await cenario();
    const outraEmpresa = await criarEmpresa("Outra");
    const produtoAlheio = await criarProduto(outraEmpresa.id, { estoqueAtual: 10 });

    const res = await POST(
      jsonRequest("/api/movimentacoes", "POST", { productId: produtoAlheio.id, tipo: "saida", quantidade: 1 })
    );

    expect(res.status).toBe(404);
    expect(await estoqueDe(produtoAlheio.id)).toBe(10);
  });
});

describe("GET /api/movimentacoes", () => {
  it("lista só as movimentações da empresa da sessão", async () => {
    const { empresa, produto } = await cenario();
    const outraEmpresa = await criarEmpresa("Outra");
    const produtoAlheio = await criarProduto(outraEmpresa.id);
    await prisma.stockMovement.createMany({
      data: [
        { empresaId: empresa.id, productId: produto.id, tipo: "entrada", quantidade: 1 },
        { empresaId: outraEmpresa.id, productId: produtoAlheio.id, tipo: "entrada", quantidade: 9 },
      ],
    });

    const res = await GET();
    const lista = await res.json();

    expect(res.status).toBe(200);
    expect(lista).toHaveLength(1);
    expect(lista[0].quantidade).toBe(1);
  });
});
