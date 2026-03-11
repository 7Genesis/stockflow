"use client";

import { useEffect, useMemo, useState } from "react";

type ProdutoOption = {
  id: string;
  nome: string;
};

type UsuarioSession = {
  id: string;
  nome: string;
  email: string;
  role: "admin" | "user";
};

type SolicitacaoItem = {
  id: string;
  quantidade: number;
  status: string;
  createdAt: string;
  user: {
    id: string;
    nome: string;
    email: string;
  };
  product: ProdutoOption;
};

type FiltroStatus =
  | "todas"
  | "pendente"
  | "aprovada"
  | "recusada"
  | "cancelada";

function getSessionUser(): UsuarioSession | null {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith("session="));

  if (!cookie) return null;

  try {
    const value = decodeURIComponent(cookie.split("=")[1]);
    return JSON.parse(value) as UsuarioSession;
  } catch {
    return null;
  }
}

export default function MinhasSolicitacoesPage() {
  const [usuario, setUsuario] = useState<UsuarioSession | null>(null);
  const [produtos, setProdutos] = useState<ProdutoOption[]>([]);
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoItem[]>([]);

  const [productId, setProductId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [filtroStatus, setFiltroStatus] =
    useState<FiltroStatus>("todas");

  useEffect(() => {
    setUsuario(getSessionUser());
  }, []);

  async function carregarProdutos() {
    const response = await fetch("/api/produtos", { cache: "no-store" });
    const data = await response.json();
    setProdutos(data);
  }

  async function carregarSolicitacoes() {
    const response = await fetch("/api/solicitacoes", { cache: "no-store" });
    const data = await response.json();
    setSolicitacoes(data);
  }

  useEffect(() => {
    carregarProdutos();
    carregarSolicitacoes();
  }, []);

  async function salvarSolicitacao() {
    if (!usuario?.id || !productId || !quantidade) {
      alert("Selecione o produto e a quantidade.");
      return;
    }

    const response = await fetch("/api/solicitacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: usuario.id,
        productId,
        quantidade: Number(quantidade),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Erro ao criar solicitação");
      return;
    }

    setProductId("");
    setQuantidade("");
    await carregarSolicitacoes();

    alert("Solicitação criada com sucesso");
  }

  async function cancelarSolicitacao(id: string) {
    const confirmar = window.confirm("Deseja cancelar esta solicitação?");
    if (!confirmar) return;

    const response = await fetch(`/api/solicitacoes/${id}/cancelar`, {
      method: "PATCH",
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Erro ao cancelar");
      return;
    }

    alert("Solicitação cancelada");
    await carregarSolicitacoes();
  }

  const minhasSolicitacoes = useMemo(() => {
    if (!usuario?.id) return [];

    const base = solicitacoes.filter(
      (solicitacao) => solicitacao.user.id === usuario.id
    );

    if (filtroStatus === "todas") return base;

    return base.filter((solicitacao) => solicitacao.status === filtroStatus);
  }, [solicitacoes, usuario, filtroStatus]);

  const totalPendentes = minhasSolicitacoes.filter(
    (item) => item.status === "pendente"
  ).length;

  const totalAprovadas = minhasSolicitacoes.filter(
    (item) => item.status === "aprovada"
  ).length;

  const totalRecusadas = minhasSolicitacoes.filter(
    (item) => item.status === "recusada"
  ).length;

  const totalCanceladas = minhasSolicitacoes.filter(
    (item) => item.status === "cancelada"
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">
          Minhas Solicitações
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Solicite materiais e acompanhe aprovação
        </p>
      </div>

      {usuario && (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold text-zinc-900">
            Usuário logado
          </h2>
          <p className="text-sm text-zinc-700">{usuario.nome}</p>
          <p className="text-sm text-zinc-500">{usuario.email}</p>
        </section>
      )}

      <div className="grid gap-4 md:grid-cols-4">
        <CardResumo titulo="Pendentes" valor={totalPendentes} />
        <CardResumo titulo="Aprovadas" valor={totalAprovadas} />
        <CardResumo titulo="Recusadas" valor={totalRecusadas} />
        <CardResumo titulo="Canceladas" valor={totalCanceladas} />
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900">
          Nova solicitação
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Produto</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            >
              <option value="">Selecione</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-600">
              Quantidade
            </label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>
        </div>

        <button
          onClick={salvarSolicitacao}
          className="mt-6 rounded-xl bg-zinc-900 px-6 py-3 text-white hover:bg-zinc-800"
        >
          Criar solicitação
        </button>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-xl font-semibold text-zinc-900">
            Histórico das minhas solicitações
          </h2>

          <div className="w-full max-w-xs">
            <label className="mb-1 block text-sm text-zinc-600">Status</label>
            <select
              value={filtroStatus}
              onChange={(e) =>
                setFiltroStatus(e.target.value as FiltroStatus)
              }
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            >
              <option value="todas">Todas</option>
              <option value="pendente">Pendentes</option>
              <option value="aprovada">Aprovadas</option>
              <option value="recusada">Recusadas</option>
              <option value="cancelada">Canceladas</option>
            </select>
          </div>
        </div>

        {minhasSolicitacoes.length === 0 ? (
          <p className="text-sm text-zinc-500">
            Nenhuma solicitação encontrada.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b text-left text-zinc-500">
                  <th className="p-3">Produto</th>
                  <th className="p-3">Quantidade</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Data</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>

              <tbody>
                {minhasSolicitacoes.map((solicitacao) => (
                  <tr key={solicitacao.id} className="border-b">
                    <td className="p-3">{solicitacao.product.nome}</td>
                    <td className="p-3">{solicitacao.quantidade}</td>

                    <td className="p-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          solicitacao.status === "aprovada"
                            ? "bg-green-100 text-green-700"
                            : solicitacao.status === "recusada"
                            ? "bg-red-100 text-red-700"
                            : solicitacao.status === "cancelada"
                            ? "bg-zinc-200 text-zinc-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {solicitacao.status}
                      </span>
                    </td>

                    <td className="p-3">
                      {new Date(solicitacao.createdAt).toLocaleDateString(
                        "pt-BR"
                      )}
                    </td>

                    <td className="p-3 text-center">
                      {solicitacao.status === "pendente" && (
                        <button
                          onClick={() => cancelarSolicitacao(solicitacao.id)}
                          className="font-medium text-red-600 hover:text-red-800"
                        >
                          Cancelar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function CardResumo({
  titulo,
  valor,
}: {
  titulo: string;
  valor: number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-zinc-500">{titulo}</p>
      <p className="mt-2 text-3xl font-semibold text-zinc-900">{valor}</p>
    </div>
  );
}