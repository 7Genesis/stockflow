import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { POST as registrar } from "@/app/api/auth/registro/route";
import { POST as login } from "@/app/api/login/route";
import { lerSessaoAssinada } from "@/lib/session-cookie";
import { desconectar, limparBanco } from "../helpers/db";
import { jsonRequest } from "../helpers/session";

beforeEach(limparBanco);
afterAll(desconectar);

const cadastro = {
  empresaNome: "Mercadinho Central",
  tipoDocumento: "cnpj",
  documento: "11222333000181",
  nome: "Maria",
  email: "maria@mercadinho.com",
  senha: "segredo123",
};

const cookieDe = (res: Response) =>
  decodeURIComponent((res.headers.get("set-cookie") ?? "").split("session=")[1]?.split(";")[0] ?? "");

describe("POST /api/login", () => {
  beforeEach(async () => {
    await registrar(jsonRequest("/api/auth/registro", "POST", cadastro));
  });

  it("entra com a senha certa e devolve cookie de sessão assinado", async () => {
    const res = await login(jsonRequest("/api/login", "POST", { email: cadastro.email, senha: cadastro.senha }));

    expect(res.status).toBe(200);
    expect(lerSessaoAssinada(cookieDe(res))).toMatchObject({ email: cadastro.email, role: "admin" });
  });

  it("recusa senha errada e não define cookie", async () => {
    const res = await login(jsonRequest("/api/login", "POST", { email: cadastro.email, senha: "errada123" }));

    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.headers.get("set-cookie")).toBeNull();
  });
});
