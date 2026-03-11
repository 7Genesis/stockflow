"use client";

import { useEffect, useState } from "react";

type SessionUser = {
  id: string;
  nome: string;
  email: string;
  role: "admin" | "user";
};

function getSessionUser(): SessionUser | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const sessionCookie = cookies.find((item) => item.startsWith("session="));

  if (!sessionCookie) return null;

  try {
    const rawValue = sessionCookie.substring("session=".length);
    const decodedValue = decodeURIComponent(rawValue);
    const json = atob(decodedValue);

    return JSON.parse(json) as SessionUser;
  } catch (error) {
    console.error("Erro ao ler sessão:", error);
    return null;
  }
}

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [usuario, setUsuario] = useState<SessionUser | null>(null);

  useEffect(() => {
    const session = getSessionUser();
    setUsuario(session);
  }, []);

  async function sair() {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Erro ao sair:", error);
    } finally {
      window.location.href = "/login";
    }
  }

  const isAdmin = usuario?.role === "admin";
  const isUser = usuario?.role === "user";

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="grid min-h-screen grid-cols-[260px_1fr]">
        <aside className="border-r border-zinc-200 bg-white p-6">
          <h1 className="mb-2 text-2xl font-bold">StockFlow</h1>

          {usuario && (
            <div className="mb-8 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="font-medium text-zinc-900">{usuario.nome}</p>
              <p className="text-sm text-zinc-500">{usuario.email}</p>

              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-block rounded-full bg-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-700">
                  {usuario.role}
                </span>
              </div>
            </div>
          )}

          <nav className="space-y-2">
            {isAdmin && (
              <>
                <a
                  href="/dashboard"
                  className="block rounded-xl px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-100"
                >
                  Dashboard
                </a>

                <a
                  href="/produtos"
                  className="block rounded-xl px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-100"
                >
                  Produtos
                </a>

                <a
                  href="/movimentacoes"
                  className="block rounded-xl px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-100"
                >
                  Movimentações
                </a>

                <a
                  href="/scanner"
                  className="block rounded-xl px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-100"
                >
                  Scanner
                </a>

                <a
                  href="/solicitacoes"
                  className="block rounded-xl px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-100"
                >
                  Solicitações
                </a>

                <a
                  href="/usuarios"
                  className="block rounded-xl px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-100"
                >
                  Usuários
                </a>
              </>
            )}

            {(isAdmin || isUser) && (
              <>
                <a
                  href="/minhas-solicitacoes"
                  className="block rounded-xl px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-100"
                >
                  Minhas Solicitações
                </a>

                <a
                  href="/perfil"
                  className="block rounded-xl px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-100"
                >
                  Perfil
                </a>
              </>
            )}
          </nav>

          <button
            onClick={sair}
            className="mt-8 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-100"
          >
            Sair
          </button>
        </aside>

        <div className="flex flex-col">
          <header className="border-b border-zinc-200 bg-white px-8 py-4">
            <p className="text-sm text-zinc-500">
              Sistema de controle de estoque
            </p>
          </header>

          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}