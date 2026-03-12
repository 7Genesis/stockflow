"use client";

import { useEffect, useMemo, useState } from "react";

type Produto = {
  id: string;
  nome: string;
};

type Movimentacao = {
  id: string;
  tipo: "entrada" | "saida";
  quantidade: number;
  observacao: string | null;
  createdAt: string;
  product: {
    id: string;
    nome: string;
  };
};

export default function MovimentacoesPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [productId, setProductId] = useState("");
  const [tipo, setTipo] = useState<"entrada" | "saida">("entrada");
  const [quantidade, setQuantidade] = useState("");
  const [observacao, setObservacao] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<"todos" | "entrada" | "saida">(
    "todos"
  );

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

  async function carregarMovimentacoes() {
    try {
      const response = await fetch("/api/movimentacoes", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Erro ao carregar movimentações:", data);
        return;
      }

      setMovimentacoes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar movimentações:", error);
    }
  }

  async function carregarDados() {
    try {
      setCarregando(true);
      await Promise.all([carregarProdutos(), carregarMovimentacoes()]);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function limparFormulario() {
    setProductId("");
    setTipo("entrada");
    setQuantidade("");
    setObservacao("");
  }

  async function salvarMovimentacao() {
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

      const response = await fetch("/api/movimentacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          tipo,
          quantidade: quantidadeNumero,
          observacao,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao salvar movimentação");
        return;
      }

      alert("Movimentação registrada com sucesso");
      limparFormulario();
      await carregarMovimentacoes();
      await carregarProdutos();
    } catch (error) {
      console.error("Erro ao salvar movimentação:", error);
      alert("Erro ao salvar movimentação");
    } finally {
      setSalvando(false);
    }
  }

  function exportarCsv() {
    window.open("/api/movimentacoes/exportar", "_blank");
  }

  const movimentacoesFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return movimentacoes.filter((mov) => {
      const matchBusca =
        mov.product.nome.toLowerCase().includes(termo) ||
        (mov.observacao || "").toLowerCase().includes(termo);

      const matchTipo = filtroTipo === "todos" || mov.tipo === filtroTipo;

      return matchBusca && matchTipo;
    });
  }, [movimentacoes, busca, filtroTipo]);

  const totalEntradas = movimentacoesFiltradas
    .filter((mov) => mov.tipo === "entrada")
    .reduce((total, mov) => total + mov.quantidade, 0);

  const totalSaidas = movimentacoesFiltradas
    .filter((mov) => mov.tipo === "saida")
    .reduce((total, mov) => total + mov.quantidade, 0);

  const saldo = totalEntradas - totalSaidas;

  if (carregando) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">Carregando movimentações...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Movimentações</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Registre entradas e saídas de estoque
          </p>
        </div>

        <button
          onClick={carregarDados}
          className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
        >
          Atualizar
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <ResumoCard
          titulo="Entradas"
          valor={String(totalEntradas)}
          destaque="entrada"
        />
        <ResumoCard
          titulo="Saídas"
          valor={String(totalSaidas)}
          destaque="saida"
        />
        <ResumoCard titulo="Saldo" valor={String(saldo)} />
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">
              Nova movimentação
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Registre uma entrada ou saída manualmente
            </p>
          </div>
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
              Tipo
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as "entrada" | "saida")}
              className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:bg-white focus:ring-2 focus:ring-zinc-200"
            >
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Quantidade
            </label>
            <input
              type="number"
              min="1"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:bg-white focus:ring-2 focus:ring-zinc-200"
              placeholder="Digite a quantidade"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Observação
            </label>
            <input
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:bg-white focus:ring-2 focus:ring-zinc-200"
              placeholder="Opcional"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={salvarMovimentacao}
            disabled={salvando}
            className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {salvando ? "Salvando..." : "Salvar movimentação"}
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
              Histórico de movimentações
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {movimentacoesFiltradas.length} movimentação(ões) encontrada(s)
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <input
              placeholder="Buscar produto ou observação..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm"
            />

            <select
              value={filtroTipo}
              onChange={(e) =>
                setFiltroTipo(e.target.value as "todos" | "entrada" | "saida")
              }
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm"
            >
              <option value="todos">Todos</option>
              <option value="entrada">Entradas</option>
              <option value="saida">Saídas</option>
            </select>

            <button
              onClick={exportarCsv}
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
            >
              Exportar CSV
            </button>
          </div>
        </div>

        {movimentacoesFiltradas.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
            Nenhuma movimentação encontrada.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-zinc-200">
            <table className="min-w-full bg-white">
              <thead className="bg-zinc-50">
                <tr className="text-left">
                  <th className="px-4 py-3 text-sm font-semibold text-zinc-700">
                    Produto
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-zinc-700">
                    Tipo
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-zinc-700">
                    Quantidade
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-zinc-700">
                    Observação
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-zinc-700">
                    Data
                  </th>
                </tr>
              </thead>

              <tbody>
                {movimentacoesFiltradas.map((movimentacao) => (
                  <tr
                    key={movimentacao.id}
                    className="border-t border-zinc-100 hover:bg-zinc-50"
                  >
                    <td className="px-4 py-4 text-sm font-medium text-zinc-900">
                      {movimentacao.product.nome}
                    </td>

                    <td className="px-4 py-4 text-sm">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          movimentacao.tipo === "entrada"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {movimentacao.tipo}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm text-zinc-600">
                      {movimentacao.quantidade}
                    </td>

                    <td className="px-4 py-4 text-sm text-zinc-600">
                      {movimentacao.observacao || "-"}
                    </td>

                    <td className="px-4 py-4 text-sm text-zinc-600">
                      {new Date(movimentacao.createdAt).toLocaleString("pt-BR")}
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
  destaque?: "entrada" | "saida";
}) {
  const classe =
    destaque === "entrada"
      ? "border-emerald-200 bg-emerald-50"
      : destaque === "saida"
      ? "border-red-200 bg-red-50"
      : "border-zinc-200 bg-white";

  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${classe}`}>
      <p className="text-sm text-zinc-500">{titulo}</p>
      <p className="mt-2 text-3xl font-semibold text-zinc-900">{valor}</p>
    </div>
  );
}