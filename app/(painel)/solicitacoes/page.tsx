"use client";

import { useEffect, useMemo, useState } from "react";

type Produto = {
  id: string;
  nome: string;
};

type User = {
  id: string;
  nome: string;
  email: string;
};

type Solicitacao = {
  id: string;
  quantidade: number;
  status: "pendente" | "aprovada" | "recusada" | "cancelada";
  createdAt: string;
  user: User;
  product: Produto;
};

export default function SolicitacoesPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);

  const [productId, setProductId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<
    "todas" | "pendente" | "aprovada" | "recusada" | "cancelada"
  >("todas");

  async function carregarProdutos() {
    try {
      const response = await fetch("/api/produtos", { cache: "no-store" });
      const data = await response.json();

      if (!response.ok) {
        console.error("Erro ao carregar produtos:", data);
        return;
      }

      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }

  async function carregarSolicitacoes() {
    try {
      const response = await fetch("/api/solicitacoes", { cache: "no-store" });
      const data = await response.json();

      if (!response.ok) {
        console.error("Erro ao carregar solicitações:", data);
        return;
      }

      setSolicitacoes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar solicitações:", error);
    }
  }

  async function carregarDados() {
    try {
      setCarregando(true);
      await Promise.all([carregarProdutos(), carregarSolicitacoes()]);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function limparFormulario() {
    setProductId("");
    setQuantidade("");
  }

  async function salvarSolicitacao() {
    const quantidadeNumero = Number(quantidade);

    if (!productId) {
      alert("Selecione um produto.");
      return;
    }

    if (!quantidade || Number.isNaN(quantidadeNumero) || quantidadeNumero <= 0) {
      alert("Informe uma quantidade válida.");
      return;
    }

    try {
      setSalvando(true);

      const response = await fetch("/api/solicitacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantidade: quantidadeNumero,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao criar solicitação");
        return;
      }

      limparFormulario();
      await carregarSolicitacoes();
      alert("Solicitação criada com sucesso");
    } catch (error) {
      console.error("Erro ao criar solicitação:", error);
      alert("Erro ao criar solicitação");
    } finally {
      setSalvando(false);
    }
  }

  async function aprovarSolicitacao(id: string) {
    try {
      const response = await fetch(`/api/solicitacoes/${id}/aprovar`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao aprovar solicitação");
        return;
      }

      await carregarSolicitacoes();
      alert("Solicitação aprovada com sucesso");
    } catch (error) {
      console.error("Erro ao aprovar solicitação:", error);
      alert("Erro ao aprovar solicitação");
    }
  }

  async function recusarSolicitacao(id: string) {
    try {
      const response = await fetch(`/api/solicitacoes/${id}/recusar`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao recusar solicitação");
        return;
      }

      await carregarSolicitacoes();
      alert("Solicitação recusada com sucesso");
    } catch (error) {
      console.error("Erro ao recusar solicitação:", error);
      alert("Erro ao recusar solicitação");
    }
  }

  function exportarCsv() {
    window.open("/api/solicitacoes/exportar", "_blank");
  }

  const solicitacoesFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return solicitacoes.filter((solicitacao) => {
      const matchBusca =
        solicitacao.user.nome.toLowerCase().includes(termo) ||
        solicitacao.user.email.toLowerCase().includes(termo) ||
        solicitacao.product.nome.toLowerCase().includes(termo);

      const matchStatus =
        filtroStatus === "todas" || solicitacao.status === filtroStatus;

      return matchBusca && matchStatus;
    });
  }, [solicitacoes, busca, filtroStatus]);

  const totalPendentes = solicitacoesFiltradas.filter(
    (item) => item.status === "pendente"
  ).length;

  const totalAprovadas = solicitacoesFiltradas.filter(
    (item) => item.status === "aprovada"
  ).length;

  const totalRecusadas = solicitacoesFiltradas.filter(
    (item) => item.status === "recusada"
  ).length;

  const totalCanceladas = solicitacoesFiltradas.filter(
    (item) => item.status === "cancelada"
  ).length;

  if (carregando) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">Carregando solicitações...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Solicitações</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Solicite materiais e aprove saídas do estoque
          </p>
        </div>

        <button
          onClick={carregarDados}
          className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
        >
          Atualizar
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ResumoCard titulo="Pendentes" valor={String(totalPendentes)} destaque="pendente" />
        <ResumoCard titulo="Aprovadas" valor={String(totalAprovadas)} destaque="aprovada" />
        <ResumoCard titulo="Recusadas" valor={String(totalRecusadas)} destaque="recusada" />
        <ResumoCard titulo="Canceladas" valor={String(totalCanceladas)} destaque="cancelada" />
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-zinc-900">
            Nova solicitação
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Crie uma solicitação manualmente para um produto
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Produto
            </label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:bg-white focus:ring-2 focus:ring-zinc-200"
            >
              <option value="">Selecione um produto</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Quantidade
            </label>
            <input
              type="number"
              min="1"
              step="1"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:bg-white focus:ring-2 focus:ring-zinc-200"
              placeholder="Digite a quantidade"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={salvarSolicitacao}
            disabled={salvando}
            className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {salvando ? "Criando..." : "Criar solicitação"}
          </button>

          <button
            type="button"
            onClick={limparFormulario}
            className="rounded-2xl border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            Limpar
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">
              Lista de solicitações
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {solicitacoesFiltradas.length} solicitação(ões) encontrada(s)
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <input
              placeholder="Buscar usuário, email ou produto..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm"
            />

            <select
              value={filtroStatus}
              onChange={(e) =>
                setFiltroStatus(
                  e.target.value as
                    | "todas"
                    | "pendente"
                    | "aprovada"
                    | "recusada"
                    | "cancelada"
                )
              }
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm"
            >
              <option value="todas">Todas</option>
              <option value="pendente">Pendentes</option>
              <option value="aprovada">Aprovadas</option>
              <option value="recusada">Recusadas</option>
              <option value="cancelada">Canceladas</option>
            </select>

            <button
              onClick={exportarCsv}
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
            >
              Exportar CSV
            </button>
          </div>
        </div>

        {solicitacoesFiltradas.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
            Nenhuma solicitação encontrada.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-zinc-200">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-zinc-50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold text-zinc-700">
                    Usuário
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">
                    Produto
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">
                    Quantidade
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">
                    Status
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">
                    Data
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-zinc-700">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {solicitacoesFiltradas.map((solicitacao) => (
                  <tr
                    key={solicitacao.id}
                    className="border-t border-zinc-100 hover:bg-zinc-50"
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-zinc-900">
                          {solicitacao.user.nome}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {solicitacao.user.email}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-zinc-700">
                      {solicitacao.product.nome}
                    </td>

                    <td className="px-4 py-4 text-zinc-600">
                      {solicitacao.quantidade}
                    </td>

                    <td className="px-4 py-4">
                      <StatusBadge status={solicitacao.status} />
                    </td>

                    <td className="px-4 py-4 text-zinc-600">
                      {new Date(solicitacao.createdAt).toLocaleString("pt-BR")}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {solicitacao.status === "pendente" ? (
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          <button
                            onClick={() => aprovarSolicitacao(solicitacao.id)}
                            className="font-medium text-emerald-600 hover:text-emerald-800"
                          >
                            Aprovar
                          </button>

                          <button
                            onClick={() => recusarSolicitacao(solicitacao.id)}
                            className="font-medium text-red-600 hover:text-red-800"
                          >
                            Recusar
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-zinc-400">
                          Sem ações
                        </span>
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

function ResumoCard({
  titulo,
  valor,
  destaque,
}: {
  titulo: string;
  valor: string;
  destaque?: "pendente" | "aprovada" | "recusada" | "cancelada";
}) {
  const classe =
    destaque === "pendente"
      ? "border-yellow-200 bg-yellow-50"
      : destaque === "aprovada"
      ? "border-emerald-200 bg-emerald-50"
      : destaque === "recusada"
      ? "border-red-200 bg-red-50"
      : destaque === "cancelada"
      ? "border-zinc-300 bg-zinc-50"
      : "border-zinc-200 bg-white";

  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${classe}`}>
      <p className="text-sm text-zinc-500">{titulo}</p>
      <p className="mt-2 text-3xl font-semibold text-zinc-900">{valor}</p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: "pendente" | "aprovada" | "recusada" | "cancelada";
}) {
  const classe =
    status === "aprovada"
      ? "bg-emerald-100 text-emerald-700"
      : status === "recusada"
      ? "bg-red-100 text-red-700"
      : status === "cancelada"
      ? "bg-zinc-200 text-zinc-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${classe}`}>
      {status}
    </span>
  );
}