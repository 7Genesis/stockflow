import { cookies } from "next/headers";
import { SESSION_COOKIE, lerSessaoAssinada, type SessionUser } from "@/lib/session-cookie";

export type { SessionUser };

export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    return lerSessaoAssinada(cookieStore.get(SESSION_COOKIE)?.value);
  } catch (error) {
    console.error("Erro ao ler sessão:", error);
    return null;
  }
}