"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Produto = {
  id: string;
  nome: string;
  sku: string | null;
  codigoBarras: string | null;
};

type Movimentacao = {
  id: string;
  tipo: string;
  quantidade: number;
  observacao: string | null;
  createdAt: string;
  product: Produto;
};

type ResumoPorProduto = {
  productId: string;
  nome: string;
  entrada: number;
  saida: number;
};

type GraficoItem = {
  data: string;
  entrada: number;
  saida: number;
};

type RelatorioResponse = {
  totalMovimentacoes: number;
  totalEntradas: number;
  totalSaidas: number;
  saldo: number;
  movimentacoes: Movimentacao[];
  porProduto: ResumoPorProduto[];
  grafico: GraficoItem[];
};

export default function RelatorioMovimentacoesPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [dados, setDados] = useState<RelatorioResponse | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [productId, setProductId] = useState("");
  const [tipo, setTipo] = useState("todos");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  async function carregarProdutos() {
    try {
      const response = await fetch("/api/produtos", {
        cache: "no-store",
      });

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

  async function carregarRelatorio() {
    try {
      setCarregando(true);
      setErro("");

      const params = new URLSearchParams();

      if (productId) params.set("productId", productId);
      if (tipo !== "todos") params.set("tipo", tipo);
      if (dataInicio) params.set("dataInicio", dataInicio);
      if (dataFim) params.set("dataFim", dataFim);

      const response = await fetch(
        `/api/relatorios/movimentacoes?${params.toString()}`,
        { cache: "no-store" }
      );

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Erro ao carregar relatório");
        return;
      }

      setDados(data);
    } catch (error) {
      console.error("Erro ao carregar relatório:", error);
      setErro("Erro ao carregar relatório");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarProdutos();
    carregarRelatorio();
  }, []);

  function aplicarFiltros() {
    carregarRelatorio();
  }

  function limparFiltros() {
    setProductId("");
    setTipo("todos");
    setDataInicio("");
    setDataFim("");

    setTimeout(() => {
      carregarRelatorio();
    }, 0);
  }

  function exportarCsv() {
    const params = new URLSearchParams();

    if (productId) params.set("productId", productId);
    if (tipo !== "todos") params.set("tipo", tipo);
    if (dataInicio) params.set("dataInicio", dataInicio);
    if (dataFim) params.set("dataFim", dataFim);

    window.location.href = `/api/relatorios/movimentacoes/exportar?${params.toString()}`;
  }

  function exportarExcel() {
    const params = new URLSearchParams();

    if (productId) params.set("productId", productId);
    if (tipo !== "todos") params.set("tipo", tipo);
    if (dataInicio) params.set("dataInicio", dataInicio);
    if (dataFim) params.set("dataFim", dataFim);

    window.location.href = `/api/relatorios/movimentacoes/exportar-excel?${params.toString()}`;
  }

  const topProdutos = useMemo(() => {
    return dados?.porProduto.slice(0, 5) ?? [];
  }, [dados]);

  if (carregando) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">Carregando relatório...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
        <p className="text-sm text-red-700">{erro}</p>
      </div>
    );
  }

  if (!dados) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">
            Relatório de Movimentações
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Acompanhe entradas, saídas e consumo de estoque
          </p>
        </div>

        <button
          onClick={carregarRelatorio}
          className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
        >
          Atualizar
        </button>
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Produto
            </label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm"
            >
              <option value="">Todos</option>
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
              className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm"
            >
              <option value="todos">Todos</option>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Data inicial
            </label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Data final
            </label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={aplicarFiltros}
            className="rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white"
          >
            Aplicar filtros
          </button>

          <button
            onClick={limparFiltros}
            className="rounded-2xl border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Limpar filtros
          </button>

          <button
            onClick={exportarCsv}
            className="rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Exportar CSV
          </button>

          <button
            onClick={exportarExcel}
            className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Exportar Excel
          </button>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <CardResumo
          titulo="Total de movimentações"
          valor={String(dados.totalMovimentacoes)}
        />
        <CardResumo
          titulo="Total de entradas"
          valor={String(dados.totalEntradas)}
        />
        <CardResumo
          titulo="Total de saídas"
          valor={String(dados.totalSaidas)}
        />
        <CardResumo
          titulo="Saldo"
          valor={String(dados.saldo)}
          destaque={dados.saldo < 0 ? "negativo" : "positivo"}
        />
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-zinc-900">
            Entradas x Saídas por período
          </h2>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dados.grafico}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="data" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="entrada" name="Entradas" radius={[8, 8, 0, 0]} />
              <Bar dataKey="saida" name="Saídas" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-zinc-900">
              Produtos mais movimentados
            </h2>
          </div>

          {topProdutos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
              Nenhum dado encontrado.
            </div>
          ) : (
            <div className="space-y-3">
              {topProdutos.map((item) => (
                <div
                  key={item.productId}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                >
                  <p className="font-medium text-zinc-900">{item.nome}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-sm">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
                      Entrada: {item.entrada}
                    </span>
                    <span className="rounded-full bg-red-100 px-3 py-1 text-red-700">
                      Saída: {item.saida}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-zinc-900">
              Últimas movimentações
            </h2>
          </div>

          {dados.movimentacoes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
              Nenhuma movimentação encontrada.
            </div>
          ) : (
            <div className="space-y-3">
              {dados.movimentacoes.slice(0, 10).map((mov) => (
                <div
                  key={mov.id}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-medium text-zinc-900">
                        {mov.product.nome}
                      </p>
                      <p className="text-sm text-zinc-500">
                        {new Date(mov.createdAt).toLocaleString("pt-BR")}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        mov.tipo === "entrada"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {mov.tipo}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-zinc-600">
                    Quantidade:{" "}
                    <strong className="text-zinc-900">{mov.quantidade}</strong>
                  </p>

                  {mov.observacao && (
                    <p className="mt-1 text-sm text-zinc-500">
                      {mov.observacao}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function CardResumo({
  titulo,
  valor,
  destaque,
}: {
  titulo: string;
  valor: string;
  destaque?: "positivo" | "negativo";
}) {
  const classe =
    destaque === "positivo"
      ? "border-emerald-200 bg-emerald-50"
      : destaque === "negativo"
      ? "border-red-200 bg-red-50"
      : "border-zinc-200 bg-white";

  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${classe}`}>
      <p className="text-sm text-zinc-500">{titulo}</p>
      <p className="mt-2 text-3xl font-semibold text-zinc-900">{valor}</p>
    </div>
  );
}