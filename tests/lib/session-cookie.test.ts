import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { assinarSessao, lerSessaoAssinada, type SessionUser } from "@/lib/session-cookie";

const usuario: SessionUser = {
  id: "u1",
  nome: "Maria",
  email: "maria@empresa.com",
  role: "user",
  empresaId: "e1",
};

const base64 = (obj: unknown) => Buffer.from(JSON.stringify(obj), "utf-8").toString("base64");

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("cookie de sessão assinado", () => {
  it("ida e volta devolve o mesmo usuário", () => {
    expect(lerSessaoAssinada(assinarSessao(usuario))).toEqual(usuario);
  });

  it("recusa o formato antigo (só base64, sem assinatura)", () => {
    expect(lerSessaoAssinada(base64(usuario))).toBeNull();
  });

  it("recusa cookie forjado: payload de admin com a assinatura de um usuário comum", () => {
    const [, assinatura] = assinarSessao(usuario).split(".");
    const forjado = `${base64({ ...usuario, role: "admin" })}.${assinatura}`;

    expect(lerSessaoAssinada(forjado)).toBeNull();
  });

  it("recusa payload trocado por outro empresaId", () => {
    const [, assinatura] = assinarSessao(usuario).split(".");
    const forjado = `${base64({ ...usuario, empresaId: "outra" })}.${assinatura}`;

    expect(lerSessaoAssinada(forjado)).toBeNull();
  });

  it("recusa assinatura adulterada, vazia ou de tamanho errado", () => {
    const [payload, assinatura] = assinarSessao(usuario).split(".");
    const adulterada = assinatura.replace(/.$/, (c) => (c === "0" ? "1" : "0"));

    expect(lerSessaoAssinada(`${payload}.${adulterada}`)).toBeNull();
    expect(lerSessaoAssinada(`${payload}.`)).toBeNull();
    expect(lerSessaoAssinada(`${payload}.abc`)).toBeNull();
    expect(lerSessaoAssinada(payload)).toBeNull();
  });

  it("recusa valores vazios", () => {
    expect(lerSessaoAssinada(undefined)).toBeNull();
    expect(lerSessaoAssinada(null)).toBeNull();
    expect(lerSessaoAssinada("")).toBeNull();
  });

  it("recusa cookie assinado com outro segredo", () => {
    vi.stubEnv("SESSION_SECRET", "segredo-a");
    const cookie = assinarSessao(usuario);
    vi.stubEnv("SESSION_SECRET", "segredo-b");

    expect(lerSessaoAssinada(cookie)).toBeNull();
  });

  it("recusa payload assinado mas incompleto", () => {
    vi.stubEnv("SESSION_SECRET", "segredo-a");
    const incompleto = assinarSessao({ id: "u1" } as unknown as SessionUser);

    expect(lerSessaoAssinada(incompleto)).toBeNull();
  });

  it("em produção, sem SESSION_SECRET, não assina nada", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SESSION_SECRET", "");

    expect(() => assinarSessao(usuario)).toThrow("SESSION_SECRET");
  });

  it("em produção, com SESSION_SECRET, funciona", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SESSION_SECRET", "segredo-de-producao");

    expect(lerSessaoAssinada(assinarSessao(usuario))).toEqual(usuario);
  });
});

describe("getSessionUser (lê o cookie via next/headers)", () => {
  let valorDoCookie: string | undefined;

  beforeEach(() => {
    valorDoCookie = undefined;
    vi.resetModules();
    vi.doMock("next/headers", () => ({
      cookies: async () => ({
        get: (nome: string) =>
          nome === "session" && valorDoCookie !== undefined ? { value: valorDoCookie } : undefined,
      }),
    }));
  });

  afterEach(() => {
    vi.doUnmock("next/headers");
  });

  it("aceita cookie assinado e rejeita o forjado", async () => {
    const { getSessionUser } = await import("@/lib/session");

    valorDoCookie = assinarSessao(usuario);
    expect(await getSessionUser()).toEqual(usuario);

    valorDoCookie = base64({ ...usuario, role: "superadmin" });
    expect(await getSessionUser()).toBeNull();

    valorDoCookie = undefined;
    expect(await getSessionUser()).toBeNull();
  });
});
