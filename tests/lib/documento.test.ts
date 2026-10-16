import { describe, expect, it } from "vitest";
import { onlyDigits, validarCNPJ, validarCPF, validarDocumento } from "@/lib/documento";

describe("onlyDigits", () => {
  it("mantém só os dígitos", () => {
    expect(onlyDigits("529.982.247-25")).toBe("52998224725");
    expect(onlyDigits(undefined)).toBe("");
    expect(onlyDigits(null)).toBe("");
  });
});

describe("validarCPF", () => {
  it("aceita CPF válido, com ou sem máscara", () => {
    expect(validarCPF("52998224725")).toBe(true);
    expect(validarCPF("529.982.247-25")).toBe(true);
  });

  it("recusa dígito verificador errado, tamanho errado e sequência repetida", () => {
    expect(validarCPF("52998224726")).toBe(false);
    expect(validarCPF("5299822472")).toBe(false);
    expect(validarCPF("11111111111")).toBe(false);
  });
});

describe("validarCNPJ", () => {
  it("aceita CNPJ válido, com ou sem máscara", () => {
    expect(validarCNPJ("11222333000181")).toBe(true);
    expect(validarCNPJ("11.222.333/0001-81")).toBe(true);
  });

  it("recusa dígito verificador errado, tamanho errado e sequência repetida", () => {
    expect(validarCNPJ("11222333000182")).toBe(false);
    expect(validarCNPJ("1122233300018")).toBe(false);
    expect(validarCNPJ("00000000000000")).toBe(false);
  });
});

describe("validarDocumento", () => {
  it("escolhe o validador pelo tipo", () => {
    expect(validarDocumento("cpf", "52998224725")).toBe(true);
    expect(validarDocumento("CNPJ", "11222333000181")).toBe(true);
  });

  it("não aceita CPF com tipo cnpj nem tipo desconhecido", () => {
    expect(validarDocumento("cnpj", "52998224725")).toBe(false);
    expect(validarDocumento("rg", "52998224725")).toBe(false);
  });
});
