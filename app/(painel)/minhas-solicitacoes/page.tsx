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
  empresaId: string;
};

type SolicitacaoItem = {
  id: string;
  quantidade: number;
  status: "pendente" | "aprovada" | "recusada" | "cancelada";
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
    const json = atob(value);
    return JSON.parse(json) as UsuarioSession;
  } catch {
    return null;
  }
}

export default function MinhasSolicitacoesPage() {
  const [usuario, setUsuario] = useState<UsuarioSession | null>(null);
  const [produtos, setProdutos] = useState<ProdutoOption[]>([]);
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoItem[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [productId, setProductId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todas");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    setUsuario(getSessionUser());
  }, []);

  async function carregarProdutos() {
    try {
      const response = await fetch("/api/produtos", { cache: "no-store" });
      const data = await response.json();

      if (!response.ok) {
        console.error("Erro ao carregar produtos:", data);
        return;
      }

      setProdutos(Array.isArray(data) ? data : []);
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

    if (!usuario?.id) {
      alert("Sessão não encontrada.");
      return;
    }

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

  async function cancelarSolicitacao(id: string) {
    const confirmar = window.confirm("Deseja cancelar esta solicitação?");
    if (!confirmar) return;

    try {
      const response = await fetch(`/api/solicitacoes/${id}/cancelar`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao cancelar solicitação");
        return;
      }

      alert("Solicitação cancelada com sucesso");
      await carregarSolicitacoes();
    } catch (error) {
      console.error("Erro ao cancelar solicitação:", error);
      alert("Erro ao cancelar solicitação");
    }
  }

  const minhasSolicitacoes = useMemo(() => {
    if (!usuario?.id) return [];

    const termo = busca.trim().toLowerCase();

    const base = solicitacoes.filter((solicitacao) => {
      const isMinha = solicitacao.user.id === usuario.id;

      const matchBusca =
        solicitacao.product.nome.toLowerCase().includes(termo) ||
        solicitacao.status.toLowerCase().includes(termo);

      const matchStatus =
        filtroStatus === "todas" || solicitacao.status === filtroStatus;

      return isMinha && matchBusca && matchStatus;
    });

    return base;
  }, [solicitacoes, usuario, filtroStatus, busca]);

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
          <h1 className="text-3xl font-bold text-zinc-900">
            Minhas Solicitações
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Solicite materiais e acompanhe o andamento
          </p>
        </div>

        <button
          onClick={carregarDados}
          className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
        >
          Atualizar
        </button>
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
            Solicite um item do estoque para aprovação
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
              Histórico das minhas solicitações
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {minhasSolicitacoes.length} solicitação(ões) encontrada(s)
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <input
              placeholder="Buscar por produto ou status..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm"
            />

            <select
              value={filtroStatus}
              onChange={(e) =>
                setFiltroStatus(e.target.value as FiltroStatus)
              }
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm"
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
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
            Nenhuma solicitação encontrada.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-zinc-200">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-zinc-50">
                <tr className="text-left">
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
                {minhasSolicitacoes.map((solicitacao) => (
                  <tr
                    key={solicitacao.id}
                    className="border-t border-zinc-100 hover:bg-zinc-50"
                  >
                    <td className="px-4 py-4 font-medium text-zinc-900">
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
                        <button
                          onClick={() => cancelarSolicitacao(solicitacao.id)}
                          className="font-medium text-red-600 hover:text-red-800"
                        >
                          Cancelar
                        </button>
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