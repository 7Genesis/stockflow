"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type SessionUser = {
  id: string;
  nome: string;
  email: string;
  role: "admin" | "user";
  empresaId: string;
};

type Empresa = {
  id: string;
  nome: string;
  cnpj: string | null;
};

type AlertaEstoque = {
  id: string;
  nome: string;
  estoqueAtual: number;
  estoqueMinimo: number;
};

type AlertasResponse = {
  total: number;
  produtos: AlertaEstoque[];
};

type NavItem = {
  href: string;
  label: string;
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
  const router = useRouter();
  const pathname = usePathname();

  const [usuario, setUsuario] = useState<SessionUser | null>(null);
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [alertasEstoque, setAlertasEstoque] = useState<AlertasResponse | null>(
    null
  );
  const [carregandoSessao, setCarregandoSessao] = useState(true);

  useEffect(() => {
    const session = getSessionUser();

    if (!session) {
      setUsuario(null);
      setCarregandoSessao(false);
      router.replace("/login");
      return;
    }

    setUsuario(session);
    setCarregandoSessao(false);
  }, [router]);

  useEffect(() => {
    async function carregarEmpresa() {
      if (!usuario) return;

      try {
        const response = await fetch("/api/empresa", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Erro ao carregar empresa:", data);
          return;
        }

        setEmpresa(data);
      } catch (error) {
        console.error("Erro ao carregar empresa:", error);
      }
    }

    carregarEmpresa();
  }, [usuario]);

  useEffect(() => {
    async function carregarAlertas() {
      if (!usuario) return;

      try {
        const response = await fetch("/api/alertas/estoque", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Erro ao carregar alertas:", data);
          return;
        }

        setAlertasEstoque(data);
      } catch (error) {
        console.error("Erro ao carregar alertas:", error);
      }
    }

    carregarAlertas();
  }, [usuario]);

  async function sair() {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Erro ao sair:", error);
    } finally {
      router.replace("/login");
    }
  }

  const isAdmin = usuario?.role === "admin";
  const isUser = usuario?.role === "user";

  const menuAdmin = useMemo<NavItem[]>(
    () => [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/produtos", label: "Produtos" },
      { href: "/movimentacoes", label: "Movimentações" },
      { href: "/scanner", label: "Scanner" },
      { href: "/nfe", label: "Importar NF-e" },
      { href: "/fornecedores", label: "Fornecedores" },
      { href: "/empresa", label: "Empresa" },
      { href: "/relatorios/fornecedores", label: "Relatório Fornecedores" },
      { href: "/relatorios/movimentacoes", label: "Relatório Movimentações" },
      { href: "/solicitacoes", label: "Solicitações" },
      { href: "/usuarios", label: "Usuários" },
      { href: "/usuarios/convites", label: "Convites" },
      { href: "/atividade", label: "Atividade" },
    ],
    []
  );

  const menuGeral = useMemo<NavItem[]>(
    () => [
      { href: "/minhas-solicitacoes", label: "Minhas Solicitações" },
      { href: "/perfil", label: "Perfil" },
    ],
    []
  );

  function isActive(href: string) {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  if (carregandoSessao) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 text-zinc-500">
        Carregando...
      </div>
    );
  }

  if (!usuario) return null;

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-zinc-200 bg-white">
          <div className="flex h-full flex-col">
            <div className="border-b border-zinc-200 px-6 py-6">
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                StockFlow
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                {empresa?.nome || "Gestão inteligente de estoque"}
              </p>
            </div>

            <div className="px-6 py-6">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-sm font-semibold text-zinc-900">
                  {usuario.nome}
                </p>
                <p className="mt-1 break-all text-sm text-zinc-500">
                  {usuario.email}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full bg-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-700">
                    {usuario.role}
                  </span>

                  <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {empresa?.nome || `Empresa ${usuario.empresaId.slice(0, 8)}`}
                  </span>
                </div>

                {empresa?.cnpj && (
                  <p className="mt-3 text-xs text-zinc-500">
                    CNPJ: {empresa.cnpj}
                  </p>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-6">
              {isAdmin && (
                <div className="mb-6">
                  <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Administração
                  </p>

                  <nav className="space-y-1">
                    {menuAdmin.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                          isActive(item.href)
                            ? "bg-zinc-900 text-white"
                            : "text-zinc-700 hover:bg-zinc-100"
                        }`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {(isAdmin || isUser) && (
                <div>
                  <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Conta
                  </p>

                  <nav className="space-y-1">
                    {menuGeral.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                          isActive(item.href)
                            ? "bg-zinc-900 text-white"
                            : "text-zinc-700 hover:bg-zinc-100"
                        }`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              )}
            </div>

            <div className="border-t border-zinc-200 p-4">
              <button
                onClick={sair}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                Sair
              </button>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col">
          <header className="border-b border-zinc-200 bg-white px-6 py-4 md:px-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900">
                  {empresa ? `StockFlow — ${empresa.nome}` : "Painel operacional"}
                </p>
                <p className="text-sm text-zinc-500">
                  Controle de estoque, usuários, fornecedores e NF-e
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-600">
                {empresa?.cnpj ? `CNPJ ${empresa.cnpj}` : "Ambiente ativo"}
              </div>
            </div>
          </header>

          {alertasEstoque && alertasEstoque.total > 0 && (
            <div className="border-b border-red-200 bg-red-50 px-6 py-4 md:px-8">
              <div className="mx-auto flex max-w-7xl flex-col gap-3">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-red-700">
                      ⚠ Alerta de estoque baixo
                    </p>
                    <p className="text-sm text-red-600">
                      {alertasEstoque.total} produto(s) precisam de atenção.
                    </p>
                  </div>

                  <a
                    href="/produtos"
                    className="rounded-xl bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700"
                  >
                    Ver produtos
                  </a>
                </div>

                <div className="flex flex-wrap gap-2">
                  {alertasEstoque.produtos.map((produto) => (
                    <span
                      key={produto.id}
                      className="rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-medium text-red-700"
                    >
                      {produto.nome} • {produto.estoqueAtual}/
                      {produto.estoqueMinimo}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <main className="flex-1 p-6 md:p-8">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}