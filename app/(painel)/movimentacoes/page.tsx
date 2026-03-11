"use client";

import { useEffect, useMemo, useState } from "react";

type Produto = {
  id: string;
  nome: string;
};

type Movimentacao = {
  id: string;
  tipo: string;
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
  const [tipo, setTipo] = useState("entrada");
  const [quantidade, setQuantidade] = useState("");
  const [observacao, setObservacao] = useState("");

  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");

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

      const texto = await response.text();

      let data: Movimentacao[] | { error?: string } = [];

      try {
        data = texto ? JSON.parse(texto) : [];
      } catch {
        data = [];
      }

      if (!response.ok) {
        console.error("Erro ao carregar movimentações:", data);
        return;
      }

      setMovimentacoes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar movimentações:", error);
    }
  }

  useEffect(() => {
    carregarProdutos();
    carregarMovimentacoes();
  }, []);

  async function salvarMovimentacao() {
    if (!productId || !quantidade) {
      alert("Selecione o produto e informe a quantidade.");
      return;
    }

    try {
      const response = await fetch("/api/movimentacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          tipo,
          quantidade,
          observacao,
        }),
      });

      const texto = await response.text();

      let data: { error?: string } | Record<string, unknown> = {};

      try {
        data = texto ? JSON.parse(texto) : {};
      } catch {
        data = {};
      }

      if (!response.ok) {
        alert((data as { error?: string }).error || "Erro ao salvar movimentação");
        return;
      }

      alert("Movimentação registrada com sucesso");

      setProductId("");
      setTipo("entrada");
      setQuantidade("");
      setObservacao("");

      await carregarMovimentacoes();
    } catch (error) {
      console.error("Erro ao salvar movimentação:", error);
      alert("Erro ao salvar movimentação");
    }
  }

  function exportarCsv() {
    window.open("/api/movimentacoes/exportar", "_blank");
  }

  const movimentacoesFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return movimentacoes.filter((mov) => {
      const matchBusca = mov.product.nome.toLowerCase().includes(termo);
      const matchTipo = filtroTipo === "todos" || mov.tipo === filtroTipo;

      return matchBusca && matchTipo;
    });
  }, [movimentacoes, busca, filtroTipo]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Movimentações</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Registre entradas e saídas de estoque
        </p>
      </div>

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-zinc-900">
            Nova movimentação
          </h2>
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
              onChange={(e) => setTipo(e.target.value)}
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
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:bg-white focus:ring-2 focus:ring-zinc-200"
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
            />
          </div>
        </div>

        <button
          onClick={salvarMovimentacao}
          className="mt-6 rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Salvar movimentação
        </button>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
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
              placeholder="Buscar produto..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm"
            />

            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
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
                      {new Date(movimentacao.createdAt).toLocaleDateString(
                        "pt-BR"
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