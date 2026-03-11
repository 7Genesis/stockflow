import { cookies } from "next/headers";

export type SessionUser = {
  id: string;
  nome: string;
  email: string;
  role: "admin" | "user";
};

export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session?.value) return null;

    const decodedValue = decodeURIComponent(session.value);
    const json = Buffer.from(decodedValue, "base64").toString("utf-8");

    return JSON.parse(json) as SessionUser;
  } catch (error) {
    console.error("Erro ao ler sessão:", error);
    return null;
  }
}