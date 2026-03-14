"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type FinanceiroSaas = {
  totalEmpresas: number;
  receitaMensalEstimada: number;
  status: {
    pendentes: number;
    ativas: number;
    atrasadas: number;
    suspensas: number;
    canceladas: number;
    teste: number;
  };
  planos: {
    free: number;
    pro: number;
    enterprise: number;
  };
};

export default function AdminFinanceiroPage() {
  const router = useRouter();

  const [dados, setDados] = useState<FinanceiroSaas | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [saindo, setSaindo] = useState(false);

  async function carregarFinanceiro() {
    try {
      setCarregando(true);
      setErro("");

      const response = await fetch("/api/admin/financeiro", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Erro ao carregar financeiro");
        return;
      }

      setDados(data);
    } catch (error) {
      console.error("Erro ao carregar financeiro:", error);
      setErro("Erro ao carregar financeiro");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarFinanceiro();
  }, []);

  async function sair() {
    try {
      setSaindo(true);

      await fetch("/api/logout", {
        method: "POST",
      });

      router.replace("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
      router.replace("/login");
    } finally {
      setSaindo(false);
    }
  }

  const percentual = useMemo(() => {
    if (!dados || dados.totalEmpresas === 0) {
      return {
        free: 0,
        pro: 0,
        enterprise: 0,
      };
    }

    return {
      free: Math.round((dados.planos.free / dados.totalEmpresas) * 100),
      pro: Math.round((dados.planos.pro / dados.totalEmpresas) * 100),
      enterprise: Math.round(
        (dados.planos.enterprise / dados.totalEmpresas) * 100
      ),
    };
  }, [dados]);

  if (carregando) {
    return (
      <main className="min-h-screen bg-zinc-100 p-6 md:p-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-zinc-500">Carregando financeiro...</p>
        </div>
      </main>
    );
  }

  if (erro || !dados) {
    return (
      <main className="min-h-screen bg-zinc-100 p-6 md:p-8">
        <div className="mx-auto max-w-6xl space-y-4">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => router.push("/admin/empresas")}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Voltar
            </button>
          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
            <p className="text-sm text-red-700">
              {erro || "Erro ao carregar financeiro"}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-100 p-6 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">
              Admin • Financeiro
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Resumo financeiro e operacional do SaaS
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={carregarFinanceiro}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Atualizar
            </button>

            <button
              onClick={() => router.push("/admin/empresas")}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Empresas
            </button>

            <button
              onClick={() => router.push("/admin/financeiro/historico")}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Histórico
            </button>

            <button
              onClick={sair}
              disabled={saindo}
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 disabled:opacity-60"
            >
              {saindo ? "Saindo..." : "Sair"}
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card
            titulo="Receita mensal estimada"
            valor={`R$ ${dados.receitaMensalEstimada}`}
          />
          <Card titulo="Total de empresas" valor={String(dados.totalEmpresas)} />
          <Card titulo="Empresas ativas" valor={String(dados.status.ativas)} />
          <Card
            titulo="Empresas pendentes"
            valor={String(dados.status.pendentes)}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">
              Situação das empresas
            </h2>

            <div className="mt-4 space-y-3">
              <LinhaResumo
                label="Ativas"
                valor={dados.status.ativas}
                total={dados.totalEmpresas}
              />
              <LinhaResumo
                label="Pendentes"
                valor={dados.status.pendentes}
                total={dados.totalEmpresas}
              />
              <LinhaResumo
                label="Atrasadas"
                valor={dados.status.atrasadas}
                total={dados.totalEmpresas}
              />
              <LinhaResumo
                label="Suspensas"
                valor={dados.status.suspensas}
                total={dados.totalEmpresas}
              />
              <LinhaResumo
                label="Canceladas"
                valor={dados.status.canceladas}
                total={dados.totalEmpresas}
              />
              <LinhaResumo
                label="Teste"
                valor={dados.status.teste}
                total={dados.totalEmpresas}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">
              Distribuição por plano
            </h2>

            <div className="mt-4 space-y-4">
              <PlanoCard
                titulo="Free"
                valor={dados.planos.free}
                percentual={percentual.free}
              />
              <PlanoCard
                titulo="Pro"
                valor={dados.planos.pro}
                percentual={percentual.pro}
              />
              <PlanoCard
                titulo="Enterprise"
                valor={dados.planos.enterprise}
                percentual={percentual.enterprise}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function Card({
  titulo,
  valor,
}: {
  titulo: string;
  valor: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-zinc-500">{titulo}</p>
      <p className="mt-2 text-2xl font-bold text-zinc-900">{valor}</p>
    </div>
  );
}

function LinhaResumo({
  label,
  valor,
  total,
}: {
  label: string;
  valor: number;
  total: number;
}) {
  const percentual = total > 0 ? Math.round((valor / total) * 100) : 0;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-zinc-700">{label}</span>
        <span className="font-medium text-zinc-900">
          {valor} ({percentual}%)
        </span>
      </div>
      <div className="h-2 rounded-full bg-zinc-100">
        <div
          className="h-2 rounded-full bg-zinc-900"
          style={{ width: `${percentual}%` }}
        />
      </div>
    </div>
  );
}

function PlanoCard({
  titulo,
  valor,
  percentual,
}: {
  titulo: string;
  valor: number;
  percentual: number;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-900">{titulo}</p>
        <p className="text-sm text-zinc-600">
          {valor} ({percentual}%)
        </p>
      </div>

      <div className="h-2 rounded-full bg-zinc-200">
        <div
          className="h-2 rounded-full bg-zinc-900"
          style={{ width: `${percentual}%` }}
        />
      </div>
    </div>
  );
}