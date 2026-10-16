import { afterAll, beforeEach, describe, expect, it } from "vitest";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { POST } from "@/app/api/auth/registro/route";
import { desconectar, limparBanco } from "../helpers/db";
import { jsonRequest } from "../helpers/session";

beforeEach(limparBanco);
afterAll(desconectar);

const valido = {
  empresaNome: "Mercadinho Central",
  tipoDocumento: "cnpj",
  documento: "11.222.333/0001-81",
  nome: "Maria",
  email: "Maria@Mercadinho.com",
  senha: "segredo123",
};

const registrar = (corpo: object) => POST(jsonRequest("/api/auth/registro", "POST", corpo));

describe("POST /api/auth/registro", () => {
  it("cria empresa, administrador e assinatura de teste de 7 dias", async () => {
    const res = await registrar(valido);
    const corpo = await res.json();

    expect(res.status).toBe(200);
    expect(corpo.usuario).toMatchObject({ email: "maria@mercadinho.com", role: "admin" });

    const empresa = await prisma.empresa.findFirstOrThrow({ include: { assinatura: true, usuarios: true } });
    expect(empresa.documento).toBe("11222333000181");
    expect(empresa.usuarios).toHaveLength(1);
    expect(await bcrypt.compare("segredo123", empresa.usuarios[0].senha)).toBe(true);
    expect(empresa.assinatura).toMatchObject({ status: "teste", plano: "free" });

    const dias =
      (empresa.assinatura!.dataVencimento!.getTime() - empresa.assinatura!.dataInicio.getTime()) /
      (24 * 60 * 60 * 1000);
    expect(Math.round(dias)).toBe(7);
  });

  it("devolve o cookie de sessão com o usuário e a empresa", async () => {
    const res = await registrar(valido);

    const cookie = res.headers.get("set-cookie") ?? "";
    expect(cookie).toContain("session=");
    const valor = decodeURIComponent(cookie.split("session=")[1].split(";")[0]);
    const sessao = JSON.parse(Buffer.from(valor, "base64").toString("utf-8"));
    expect(sessao).toMatchObject({ email: "maria@mercadinho.com", role: "admin" });
    expect(sessao.empresaId).toEqual(expect.any(String));
  });

  it.each([
    ["CNPJ inválido", { documento: "11222333000182" }, "CNPJ inválido"],
    ["CPF inválido", { tipoDocumento: "cpf", documento: "11111111111" }, "CPF ou CNPJ inválido"],
    ["tipo de documento desconhecido", { tipoDocumento: "rg" }, "Tipo de documento inválido"],
    ["e-mail descartável", { email: "fulano@mailinator.com" }, "descartáveis"],
    ["senha curta", { senha: "123" }, "pelo menos 6 caracteres"],
    ["nome de empresa curto", { empresaNome: "ab" }, "pelo menos 3 caracteres"],
    ["campo faltando", { nome: "" }, "obrigatórios"],
  ])("recusa %s", async (_caso, alteracao, trecho) => {
    const res = await registrar({ ...valido, ...alteracao });

    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain(trecho);
    expect(await prisma.empresa.count()).toBe(0);
    expect(await prisma.user.count()).toBe(0);
  });

  it("recusa documento ou e-mail já cadastrados", async () => {
    await registrar(valido);

    const mesmoDocumento = await registrar({ ...valido, email: "outro@mercadinho.com" });
    const mesmoEmail = await registrar({ ...valido, documento: "52998224725", tipoDocumento: "cpf" });

    expect(mesmoDocumento.status).toBe(400);
    expect((await mesmoDocumento.json()).error).toContain("documento");
    expect(mesmoEmail.status).toBe(400);
    expect((await mesmoEmail.json()).error).toContain("email");
    expect(await prisma.empresa.count()).toBe(1);
  });
});
