import { cookies } from "next/headers";

export type SessionUser = {
  id: string;
  nome: string;
  email: string;
  role: "admin" | "user";
  empresaId: string;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session?.value) {
      return null;
    }

    const json = Buffer.from(session.value, "base64").toString("utf-8");
    const parsed = JSON.parse(json) as Partial<SessionUser>;

    if (
      !parsed?.id ||
      !parsed?.nome ||
      !parsed?.email ||
      !parsed?.role ||
      !parsed?.empresaId
    ) {
      return null;
    }

    return {
      id: parsed.id,
      nome: parsed.nome,
      email: parsed.email,
      role: parsed.role,
      empresaId: parsed.empresaId,
    };
  } catch (error) {
    console.error("Erro ao ler sessão:", error);
    return null;
  }
}