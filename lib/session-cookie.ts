import { createHmac, timingSafeEqual } from "node:crypto";

export type SessionUser = {
  id: string;
  nome: string;
  email: string;
  role: "superadmin" | "admin" | "user";
  empresaId: string;
};

export const SESSION_COOKIE = "session";

const SEGREDO_DE_DESENVOLVIMENTO = "stockflow-segredo-de-desenvolvimento-nao-usar-em-producao";

function segredo() {
  const valor = process.env.SESSION_SECRET;

  if (valor) return valor;

  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET não configurada.");
  }

  return SEGREDO_DE_DESENVOLVIMENTO;
}

function assinatura(payload: string) {
  return createHmac("sha256", segredo()).update(payload).digest("hex");
}

/**
 * Valor do cookie de sessão: `<base64 do JSON>.<HMAC-SHA256 em hex>`.
 * O payload continua legível pelo navegador (as telas usam nome e perfil),
 * mas só quem tem o SESSION_SECRET consegue gerar uma assinatura válida.
 */
export function assinarSessao(usuario: SessionUser) {
  const payload = Buffer.from(JSON.stringify(usuario), "utf-8").toString("base64");
  return `${payload}.${assinatura(payload)}`;
}

/** Devolve o usuário se a assinatura confere e o conteúdo está completo; senão, null. */
export function lerSessaoAssinada(valor: string | undefined | null): SessionUser | null {
  if (!valor) return null;

  const separador = valor.lastIndexOf(".");
  if (separador <= 0) return null;

  const payload = valor.slice(0, separador);
  const recebida = Buffer.from(valor.slice(separador + 1), "utf-8");
  const esperada = Buffer.from(assinatura(payload), "utf-8");

  if (recebida.length !== esperada.length || !timingSafeEqual(recebida, esperada)) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64").toString("utf-8")) as Partial<SessionUser>;

    if (!parsed?.id || !parsed?.nome || !parsed?.email || !parsed?.role || !parsed?.empresaId) {
      return null;
    }

    return {
      id: parsed.id,
      nome: parsed.nome,
      email: parsed.email,
      role: parsed.role,
      empresaId: parsed.empresaId,
    };
  } catch {
    return null;
  }
}
