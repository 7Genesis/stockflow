"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

type ProdutoEstoqueBaixo = {
  id: string;
  nome: string;
  estoqueAtual: number;
  estoqueMinimo: number;
};

type Movimentacao = {
  id: string;
  tipo: string;
  quantidade: number;
  createdAt: string;
  product: {
    nome: string;
  };
};

type GraficoMovimentacao = {
  data: string;
  entrada: number;
  saida: number;
};

type ProdutoMovimentado = {
  productId: string;
  nome: string;
  total: number;
};

type ProdutoParado = {
  id: string;
  nome: string;
  estoqueAtual: number;
};

type ConsumoMensal = {
  mes: string;
  totalSaidas: number;
};

type DashboardData = {
  totalProdutos: number;
  totalItensEstoque: number;
  totalEstoqueBaixo: number;
  solicitacoesPendentes: number;
  valorTotalEstoque: number;
  totalEntradas: number;
  totalSaidas: number;
  saldoMovimentacoes: number;
  produtosEstoqueBaixo: ProdutoEstoqueBaixo[];
  ultimasMovimentacoes: Movimentacao[];
  graficoMovimentacoes: GraficoMovimentacao[];
  produtosMaisMovimentados: ProdutoMovimentado[];
  produtosParados: ProdutoParado[];
  consumoMensal: ConsumoMensal[];
};

export default function DashboardPage() {
  const router = useRouter();

  const [dados, setDados] = useState<DashboardData | null>(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  async function carregarDashboard() {
    try {
      setErro("");
      setCarregando(true);

      const response = await fetch("/api/dashboard", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Erro ao carregar dashboard");
        return;
      }

      setDados(data);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
      setErro("Erro ao carregar dashboard");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDashboard();
  }, []);

  function exportarEstoqueBaixo() {
    window.location.href = "/api/produtos/estoque-baixo/exportar";
  }

  if (carregando) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">Carregando dashboard...</p>
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
      {dados.totalEstoqueBaixo > 0 && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-red-700">
                ⚠ Atenção: produtos com estoque baixo
              </p>
              <p className="text-sm text-red-600">
                {dados.totalEstoqueBaixo} produto(s) precisam de reposição.
              </p>
            </div>

            <a
              href="/produtos"
              className="rounded-xl bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
            >
              Ver produtos críticos
            </a>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Visão estratégica do estoque, movimentações e alertas
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => router.push("/dashboard/minha-assinatura")}
            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            Minha assinatura
          </button>

          <button
            onClick={carregarDashboard}
            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            Atualizar
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <CardResumo
          titulo="Produtos cadastrados"
          valor={String(dados.totalProdutos)}
          descricao="Base total de produtos"
        />
        <CardResumo
          titulo="Itens em estoque"
          valor={String(dados.totalItensEstoque)}
          descricao="Quantidade disponível"
        />
        <CardResumo
          titulo="Estoque baixo"
          valor={String(dados.totalEstoqueBaixo)}
          descricao="Produtos que exigem atenção"
          destaque="alerta"
        />
        <CardResumo
          titulo="Solicitações pendentes"
          valor={String(dados.solicitacoesPendentes)}
          descricao="Aguardando aprovação"
          destaque="aviso"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MiniCard
          titulo="Valor estimado em estoque"
          valor={dados.valorTotalEstoque.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        />
        <MiniCard titulo="Total de entradas" valor={String(dados.totalEntradas)} />
        <MiniCard titulo="Total de saídas" valor={String(dados.totalSaidas)} />
        <MiniCard
          titulo="Saldo das movimentações"
          valor={String(dados.saldoMovimentacoes)}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-zinc-900">
              Entradas x Saídas
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Comparativo mensal das movimentações
            </p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dados.graficoMovimentacoes}>
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

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-zinc-900">
              Consumo mensal
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Saídas consolidadas por período
            </p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dados.consumoMensal}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="totalSaidas"
                  name="Saídas"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-zinc-900">
              Produtos mais movimentados
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Ranking operacional do estoque
            </p>
          </div>

          {dados.produtosMaisMovimentados.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
              Nenhum dado disponível.
            </div>
          ) : (
            <div className="space-y-3">
              {dados.produtosMaisMovimentados.map((item) => (
                <div
                  key={item.productId}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                >
                  <p className="font-medium text-zinc-900">{item.nome}</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    Total movimentado:{" "}
                    <strong className="text-zinc-900">{item.total}</strong>
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900">
                Produtos com estoque baixo
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Produtos que precisam de reposição
              </p>
            </div>

            <button
              onClick={exportarEstoqueBaixo}
              className="rounded-xl bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
            >
              Exportar estoque baixo
            </button>
          </div>

          {dados.produtosEstoqueBaixo.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
              Nenhum produto com estoque baixo.
            </div>
          ) : (
            <div className="space-y-3">
              {dados.produtosEstoqueBaixo.map((produto) => (
                <div
                  key={produto.id}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                >
                  <p className="font-medium text-zinc-900">{produto.nome}</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    Estoque atual:{" "}
                    <strong className="text-red-600">{produto.estoqueAtual}</strong>
                  </p>
                  <p className="text-sm text-zinc-500">
                    Estoque mínimo: {produto.estoqueMinimo}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-zinc-900">
              Produtos parados
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Sem movimentações registradas
            </p>
          </div>

          {dados.produtosParados.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
              Nenhum produto parado.
            </div>
          ) : (
            <div className="space-y-3">
              {dados.produtosParados.map((produto) => (
                <div
                  key={produto.id}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                >
                  <p className="font-medium text-zinc-900">{produto.nome}</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    Estoque atual:{" "}
                    <strong className="text-zinc-900">{produto.estoqueAtual}</strong>
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-zinc-900">
            Últimas movimentações
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Histórico recente do sistema
          </p>
        </div>

        {dados.ultimasMovimentacoes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
            Nenhuma movimentação registrada.
          </div>
        ) : (
          <div className="space-y-3">
            {dados.ultimasMovimentacoes.map((mov) => (
              <div
                key={mov.id}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
              >
                <div className="flex items-center justify-between gap-4">
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
                  Quantidade movimentada:{" "}
                  <strong className="text-zinc-900">{mov.quantidade}</strong>
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function CardResumo({
  titulo,
  valor,
  descricao,
  destaque,
}: {
  titulo: string;
  valor: string;
  descricao: string;
  destaque?: "alerta" | "aviso";
}) {
  const classeDestaque =
    destaque === "alerta"
      ? "border-red-200 bg-red-50"
      : destaque === "aviso"
      ? "border-yellow-200 bg-yellow-50"
      : "border-zinc-200 bg-white";

  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${classeDestaque}`}>
      <p className="text-sm text-zinc-500">{titulo}</p>
      <p className="mt-2 text-3xl font-semibold text-zinc-900">{valor}</p>
      <p className="mt-2 text-xs text-zinc-500">{descricao}</p>
    </div>
  );
}

function MiniCard({
  titulo,
  valor,
}: {
  titulo: string;
  valor: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-zinc-500">{titulo}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-900">{valor}</p>
    </div>
  );
}