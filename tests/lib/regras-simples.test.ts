import { describe, expect, it } from "vitest";
import { limiteUsuariosPorPlano } from "@/lib/plan-limits";
import { isEmailDescartavel } from "@/lib/disposable-email";

describe("limiteUsuariosPorPlano", () => {
  it.each([
    ["free", 2],
    ["pro", 10],
    ["enterprise", 999],
    ["plano-desconhecido", 2],
  ])("plano %s permite %i usuários", (plano, limite) => {
    expect(limiteUsuariosPorPlano(plano)).toBe(limite);
  });
});

describe("isEmailDescartavel", () => {
  it("bloqueia domínios descartáveis, ignorando caixa e espaços", () => {
    expect(isEmailDescartavel("fulano@mailinator.com")).toBe(true);
    expect(isEmailDescartavel("  Fulano@YOPMAIL.com ")).toBe(true);
  });

  it("aceita e-mail comum", () => {
    expect(isEmailDescartavel("fulano@empresa.com.br")).toBe(false);
  });

  it("trata e-mail malformado como descartável", () => {
    expect(isEmailDescartavel("sem-arroba")).toBe(true);
    expect(isEmailDescartavel("a@b@c.com")).toBe(true);
  });
});
