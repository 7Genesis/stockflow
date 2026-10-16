import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { prisma } from "@/lib/prisma";
import { POST as criar } from "@/app/api/solicitacoes/route";
import { PATCH as aprovar, POST as aprovarPost } from "@/app/api/solicitacoes/[id]/aprovar/route";
import { PATCH as recusar } from "@/app/api/solicitacoes/[id]/recusar/route";
import { PATCH as cancelar } from "@/app/api/solicitacoes/[id]/cancelar/route";
import { criarEmpresa, criarProduto, criarUsuario, desconectar, limparBanco } from "../helpers/db";
import { comId, jsonRequest, logarComo } from "../helpers/session";

vi.mock("@/lib/session", () => ({ getSessionUser: vi.fn() }));

beforeEach(async () => {
  await limparBanco();
  await logarComo(null);
});
afterAll(desconectar);

async function cenario(estoque = 10) {
  const empresa = await criarEmpresa();
  const admin = await criarUsuario(empresa.id, "admin");
  const solicitante = await criarUsuario(empresa.id, "user");
  const produto = await criarProduto(empresa.id, { estoqueAtual: estoque });
  return { empresa, admin, solicitante, produto };
}

const novaSolicitacao = async (
  solicitante: Awaited<ReturnType<typeof criarUsuario>>,
  productId: string,
  quantidade: number
) => {
  await logarComo(solicitante);
  const res = await criar(jsonRequest("/api/solicitacoes", "POST", { productId, quantidade }));
  expect(res.status).toBe(201);
  return (await res.json()) as { id: string };
};

const req = (id: string, acao: string) => jsonRequest(`/api/solicitacoes/${id}/${acao}`, "PATCH");
const estoqueDe = async (id: string) =>
  (await prisma.product.findUniqueOrThrow({ where: { id } })).estoqueAtual;
const statusDe = async (id: string) =>
  (await prisma.solicitacao.findUniqueOrThrow({ where: { id } })).status;

describe("criar solicitação", () => {
  it("nasce pendente, com o usuário da sessão, e não mexe no estoque", async () => {
    const { solicitante, produto } = await cenario();

    const criada = await novaSolicitacao(solicitante, produto.id, 4);

    const banco = await prisma.solicitacao.findUniqueOrThrow({ where: { id: criada.id } });
    expect(banco).toMatchObject({ status: "pendente", userId: solicitante.id, quantidade: 4 });
    expect(await estoqueDe(produto.id)).toBe(10);
  });

  it("exige sessão", async () => {
    const res = await criar(jsonRequest("/api/solicitacoes", "POST", { productId: "x", quantidade: 1 }));

    expect(res.status).toBe(401);
  });

  it.each([
    ["sem produto", () => ({ quantidade: 1 })],
    ["quantidade zero", (id: string) => ({ productId: id, quantidade: 0 })],
    ["quantidade negativa", (id: string) => ({ productId: id, quantidade: -1 })],
  ])("recusa %s", async (_caso, corpo) => {
    const { solicitante, produto } = await cenario();
    await logarComo(solicitante);

    const res = await criar(jsonRequest("/api/solicitacoes", "POST", corpo(produto.id)));

    expect(res.status).toBe(400);
    expect(await prisma.solicitacao.count()).toBe(0);
  });

  it("não aceita produto de outra empresa", async () => {
    const { solicitante } = await cenario();
    const outraEmpresa = await criarEmpresa("Outra");
    const produtoAlheio = await criarProduto(outraEmpresa.id, { estoqueAtual: 5 });
    await logarComo(solicitante);

    const res = await criar(
      jsonRequest("/api/solicitacoes", "POST", { productId: produtoAlheio.id, quantidade: 1 })
    );

    expect(res.status).toBe(404);
  });
});

describe("aprovar solicitação", () => {
  it("baixa o estoque, registra a saída e marca como aprovada", async () => {
    const { admin, solicitante, produto } = await cenario(10);
    const { id } = await novaSolicitacao(solicitante, produto.id, 4);
    await logarComo(admin);

    const res = await aprovar(req(id, "aprovar"), comId(id));

    expect(res.status).toBe(200);
    expect(await statusDe(id)).toBe("aprovada");
    expect(await estoqueDe(produto.id)).toBe(6);
    const movs = await prisma.stockMovement.findMany({ where: { productId: produto.id } });
    expect(movs).toHaveLength(1);
    expect(movs[0]).toMatchObject({ tipo: "saida", quantidade: 4 });
  });

  it("também funciona por POST", async () => {
    const { admin, solicitante, produto } = await cenario(10);
    const { id } = await novaSolicitacao(solicitante, produto.id, 1);
    await logarComo(admin);

    const res = await aprovarPost(req(id, "aprovar"), comId(id));

    expect(res.status).toBe(200);
    expect(await estoqueDe(produto.id)).toBe(9);
  });

  it("aprova quando a quantidade é exatamente o estoque", async () => {
    const { admin, solicitante, produto } = await cenario(3);
    const { id } = await novaSolicitacao(solicitante, produto.id, 3);
    await logarComo(admin);

    const res = await aprovar(req(id, "aprovar"), comId(id));

    expect(res.status).toBe(200);
    expect(await estoqueDe(produto.id)).toBe(0);
  });

  it("recusa com estoque insuficiente e mantém tudo como estava", async () => {
    const { admin, solicitante, produto } = await cenario(2);
    const { id } = await novaSolicitacao(solicitante, produto.id, 5);
    await logarComo(admin);

    const res = await aprovar(req(id, "aprovar"), comId(id));

    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("Estoque insuficiente para aprovar a solicitação");
    expect(await statusDe(id)).toBe("pendente");
    expect(await estoqueDe(produto.id)).toBe(2);
    expect(await prisma.stockMovement.count()).toBe(0);
  });

  it("só administrador aprova", async () => {
    const { solicitante, produto } = await cenario();
    const { id } = await novaSolicitacao(solicitante, produto.id, 1);

    const res = await aprovar(req(id, "aprovar"), comId(id));

    expect(res.status).toBe(403);
    expect(await statusDe(id)).toBe("pendente");
    expect(await estoqueDe(produto.id)).toBe(10);
  });

  it("não aprova duas vezes (o estoque só baixa uma vez)", async () => {
    const { admin, solicitante, produto } = await cenario(10);
    const { id } = await novaSolicitacao(solicitante, produto.id, 4);
    await logarComo(admin);

    await aprovar(req(id, "aprovar"), comId(id));
    const segunda = await aprovar(req(id, "aprovar"), comId(id));

    expect(segunda.status).toBe(400);
    expect(await estoqueDe(produto.id)).toBe(6);
    expect(await prisma.stockMovement.count()).toBe(1);
  });

  it("não enxerga solicitação de outra empresa", async () => {
    const { solicitante, produto } = await cenario();
    const { id } = await novaSolicitacao(solicitante, produto.id, 1);
    const outraEmpresa = await criarEmpresa("Outra");
    const adminAlheio = await criarUsuario(outraEmpresa.id, "admin");
    await logarComo(adminAlheio);

    const res = await aprovar(req(id, "aprovar"), comId(id));

    expect(res.status).toBe(404);
    expect(await statusDe(id)).toBe("pendente");
  });
});

describe("recusar solicitação", () => {
  it("marca como recusada sem mexer no estoque", async () => {
    const { admin, solicitante, produto } = await cenario();
    const { id } = await novaSolicitacao(solicitante, produto.id, 4);
    await logarComo(admin);

    const res = await recusar(req(id, "recusar"), comId(id));

    expect(res.status).toBe(200);
    expect(await statusDe(id)).toBe("recusada");
    expect(await estoqueDe(produto.id)).toBe(10);
  });

  it("só administrador recusa, e só quando está pendente", async () => {
    const { admin, solicitante, produto } = await cenario();
    const { id } = await novaSolicitacao(solicitante, produto.id, 4);

    expect((await recusar(req(id, "recusar"), comId(id))).status).toBe(403);

    await logarComo(admin);
    await recusar(req(id, "recusar"), comId(id));
    expect((await recusar(req(id, "recusar"), comId(id))).status).toBe(400);
  });
});

describe("cancelar solicitação", () => {
  it("o dono cancela a própria solicitação pendente", async () => {
    const { solicitante, produto } = await cenario();
    const { id } = await novaSolicitacao(solicitante, produto.id, 2);

    const res = await cancelar(req(id, "cancelar"), comId(id));

    expect(res.status).toBe(200);
    expect(await statusDe(id)).toBe("cancelada");
  });

  it("outro usuário comum não cancela", async () => {
    const { empresa, solicitante, produto } = await cenario();
    const { id } = await novaSolicitacao(solicitante, produto.id, 2);
    const outroUsuario = await criarUsuario(empresa.id, "user");
    await logarComo(outroUsuario);

    const res = await cancelar(req(id, "cancelar"), comId(id));

    expect(res.status).toBe(403);
    expect(await statusDe(id)).toBe("pendente");
  });

  it("administrador cancela a de qualquer usuário", async () => {
    const { admin, solicitante, produto } = await cenario();
    const { id } = await novaSolicitacao(solicitante, produto.id, 2);
    await logarComo(admin);

    const res = await cancelar(req(id, "cancelar"), comId(id));

    expect(res.status).toBe(200);
  });

  it("não cancela solicitação já aprovada", async () => {
    const { admin, solicitante, produto } = await cenario();
    const { id } = await novaSolicitacao(solicitante, produto.id, 2);
    await logarComo(admin);
    await aprovar(req(id, "aprovar"), comId(id));

    const res = await cancelar(req(id, "cancelar"), comId(id));

    expect(res.status).toBe(400);
    expect(await statusDe(id)).toBe("aprovada");
  });
});
