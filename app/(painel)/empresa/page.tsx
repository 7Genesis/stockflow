"use client";

import { useEffect, useState } from "react";

type Empresa = {
  id: string;
  nome: string;
  cnpj: string | null;
  createdAt: string;
  _count: {
    usuarios: number;
    produtos: number;
    fornecedores: number;
    solicitacoes: number;
    nfeImports: number;
  };
};

type SessionUser = {
  id: string;
  nome: string;
  email: string;
  role: "admin" | "user";
  empresaId: string;
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

export default function EmpresaPage() {
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [usuario, setUsuario] = useState<SessionUser | null>(null);

  const isAdmin = usuario?.role === "admin";

  useEffect(() => {
    setUsuario(getSessionUser());
  }, []);

  async function carregarEmpresa() {
    try {
      setCarregando(true);

      const response = await fetch("/api/empresa", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao carregar empresa");
        return;
      }

      setEmpresa(data);
      setNome(data.nome);
      setCnpj(data.cnpj || "");
    } catch (error) {
      console.error("Erro ao carregar empresa:", error);
      alert("Erro ao carregar empresa");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarEmpresa();
  }, []);

  async function salvarEmpresa() {
    if (!isAdmin) {
      alert("Apenas administradores podem editar a empresa.");
      return;
    }

    if (!nome.trim()) {
      alert("Informe o nome da empresa.");
      return;
    }

    try {
      setSalvando(true);

      const response = await fetch("/api/empresa", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          cnpj,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao salvar empresa");
        return;
      }

      setEmpresa(data);
      setNome(data.nome);
      setCnpj(data.cnpj || "");
      alert("Empresa atualizada com sucesso");
    } catch (error) {
      console.error("Erro ao salvar empresa:", error);
      alert("Erro ao salvar empresa");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">Carregando empresa...</p>
      </div>
    );
  }

  if (!empresa) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
        <p className="text-sm text-red-700">
          Não foi possível carregar os dados da empresa.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">
          Configurações da Empresa
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Gerencie os dados principais da sua empresa
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <aside className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-xl font-semibold text-white">
            {empresa.nome.slice(0, 1).toUpperCase()}
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold text-zinc-900">
              {empresa.nome}
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {empresa.cnpj || "CNPJ não informado"}
            </p>
          </div>

          <div className="mt-6 space-y-4 border-t border-zinc-200 pt-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                ID da empresa
              </p>
              <p className="mt-1 break-all text-sm text-zinc-800">
                {empresa.id}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Criada em
              </p>
              <p className="mt-1 text-sm text-zinc-800">
                {new Date(empresa.createdAt).toLocaleString("pt-BR")}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Seu acesso
              </p>
              <p className="mt-1 text-sm text-zinc-800">
                {isAdmin ? "Administrador" : "Usuário"}
              </p>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-zinc-900">
                Dados da empresa
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Atualize as informações principais do cadastro
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                  Nome da empresa
                </label>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  disabled={!isAdmin}
                  className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:bg-white focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                  CNPJ
                </label>
                <input
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  disabled={!isAdmin}
                  className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:bg-white focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="Opcional"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={salvarEmpresa}
                disabled={salvando || !isAdmin}
                className="rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {salvando ? "Salvando..." : "Salvar alterações"}
              </button>

              <button
                type="button"
                onClick={carregarEmpresa}
                className="rounded-2xl border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                Recarregar dados
              </button>
            </div>

            {!isAdmin && (
              <p className="mt-4 text-sm text-zinc-500">
                Apenas administradores podem editar os dados da empresa.
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-zinc-900">
                Resumo operacional
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Indicadores rápidos do ambiente da empresa
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <CardResumo
                titulo="Usuários"
                valor={String(empresa._count.usuarios)}
              />
              <CardResumo
                titulo="Produtos"
                valor={String(empresa._count.produtos)}
              />
              <CardResumo
                titulo="Fornecedores"
                valor={String(empresa._count.fornecedores)}
              />
              <CardResumo
                titulo="Solicitações"
                valor={String(empresa._count.solicitacoes)}
              />
              <CardResumo
                titulo="NF-e importadas"
                valor={String(empresa._count.nfeImports)}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function CardResumo({
  titulo,
  valor,
}: {
  titulo: string;
  valor: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
      <p className="text-sm text-zinc-500">{titulo}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-900">{valor}</p>
    </div>
  );
}