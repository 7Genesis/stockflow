import { vi } from "vitest";
import type { SessionUser } from "@/lib/session";

type Usuario = { id: string; nome: string; email: string; role: string; empresaId: string };

// Use junto com `vi.mock("@/lib/session", () => ({ getSessionUser: vi.fn() }))`.
export async function logarComo(usuario: Usuario | null) {
  const { getSessionUser } = await import("@/lib/session");
  vi.mocked(getSessionUser).mockResolvedValue(usuario as SessionUser | null);
}

export const jsonRequest = (url: string, method: string, body?: unknown) =>
  new Request(`http://localhost${url}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

export const comId = (id: string) => ({ params: Promise.resolve({ id }) });
