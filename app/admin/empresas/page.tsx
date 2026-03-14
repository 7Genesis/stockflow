"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type EmpresaAdmin = {
  id: string;
  nome: string;
  tipoDocumento: string | null;
  documento: string | null;
  createdAt: string;
  totalUsuarios: number;
  totalProdutos: number;
  assinatura: {
    id: string;
    status: string;
    plano: string;
    dataInicio: string;
    dataVencimento: string | null;
    dataCancelamento: string | null;
  } | null;
};

type PlanoAssinatura = "free" | "pro" | "enterprise";

export default function AdminEmpresasPage() {
  const router = useRouter();

  const [empresas, setEmpresas] = useState<EmpresaAdmin[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [empresaProcessando, setEmpresaProcessando] = useState<string | null>(
    null
  );
  const [verificandoVencimentos, setVerificandoVencimentos] = useState(false);
  const [saindo, setSaindo] = useState(false);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [planosSelecionados, setPlanosSelecionados] = useState<
    Record<string, PlanoAssinatura>
  >({});

  async function carregarEmpresas() {
    try {
      setCarregando(true);
      setErro("");

      const response = await fetch("/api/admin/empresas", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Erro ao carregar empresas");
        return;
      }

      const lista = Array.isArray(data) ? data : [];
      setEmpresas(lista);

      const mapaPlanos: Record<string, PlanoAssinatura> = {};
      for (const empresa of lista) {
        const planoAtual = empresa.assinatura?.plano;
        if (
          planoAtual === "free" ||
          planoAtual === "pro" ||
          planoAtual === "enterprise"
        ) {
          mapaPlanos[empresa.id] = planoAtual;
        } else {
          mapaPlanos[empresa.id] = "free";
        }
      }

      setPlanosSelecionados(mapaPlanos);
    } catch (error) {
      console.error("Erro ao carregar empresas:", error);
      setErro("Erro ao carregar empresas");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarEmpresas();
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

  async function suspenderEmpresa(empresaId: string) {
    try {
      setEmpresaProcessando(empresaId);

      const response = await fetch(
        `/api/admin/empresas/${empresaId}/suspender`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao suspender empresa");
        return;
      }

      await carregarEmpresas();
    } catch (error) {
      console.error("Erro ao suspender empresa:", error);
      alert("Erro ao suspender empresa");
    } finally {
      setEmpresaProcessando(null);
    }
  }

  async function reativarEmpresa(empresaId: string) {
    try {
      setEmpresaProcessando(empresaId);

      const plano = planosSelecionados[empresaId] || "free";

      const response = await fetch(
        `/api/admin/empresas/${empresaId}/reativar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plano,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao reativar empresa");
        return;
      }

      await carregarEmpresas();
    } catch (error) {
      console.error("Erro ao reativar empresa:", error);
      alert("Erro ao reativar empresa");
    } finally {
      setEmpresaProcessando(null);
    }
  }

  async function liberarEmpresa(empresaId: string) {
    try {
      setEmpresaProcessando(empresaId);

      const plano = planosSelecionados[empresaId] || "free";

      const response = await fetch(
        `/api/admin/empresas/${empresaId}/liberar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plano,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao liberar empresa");
        return;
      }

      alert("Empresa liberada com sucesso.");
      await carregarEmpresas();
    } catch (error) {
      console.error("Erro ao liberar empresa:", error);
      alert("Erro ao liberar empresa");
    } finally {
      setEmpresaProcessando(null);
    }
  }

  async function renovarEmpresa(empresaId: string) {
    try {
      setEmpresaProcessando(empresaId);

      const plano = planosSelecionados[empresaId] || "free";

      const response = await fetch(`/api/admin/empresas/${empresaId}/renovar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plano,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao renovar assinatura");
        return;
      }

      alert("Assinatura renovada com sucesso.");
      await carregarEmpresas();
    } catch (error) {
      console.error("Erro ao renovar assinatura:", error);
      alert("Erro ao renovar assinatura");
    } finally {
      setEmpresaProcessando(null);
    }
  }

  async function verificarVencimentos() {
    try {
      setVerificandoVencimentos(true);

      const response = await fetch(
        "/api/admin/assinaturas/verificar-vencimentos",
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao verificar vencimentos");
        return;
      }

      alert(
        `Assinaturas atualizadas:\nAtrasadas: ${data.atrasadas}\nSuspensas: ${data.suspensas}`
      );

      await carregarEmpresas();
    } catch (error) {
      console.error("Erro ao verificar vencimentos:", error);
      alert("Erro ao verificar vencimentos");
    } finally {
      setVerificandoVencimentos(false);
    }
  }

  function classeStatus(status?: string) {
    if (status === "ativa") return "bg-emerald-100 text-emerald-700";
    if (status === "teste") return "bg-blue-100 text-blue-700";
    if (status === "pendente") return "bg-orange-100 text-orange-700";
    if (status === "atrasada") return "bg-yellow-100 text-yellow-700";
    if (status === "suspensa") return "bg-red-100 text-red-700";
    if (status === "cancelada") return "bg-zinc-200 text-zinc-700";
    return "bg-zinc-100 text-zinc-700";
  }

  function formatarDocumento(tipo?: string | null, documento?: string | null) {
    if (!documento) return "Sem documento";
    if (tipo === "cpf") return `CPF • ${documento}`;
    if (tipo === "cnpj") return `CNPJ • ${documento}`;
    return documento;
  }

  const empresasFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return empresas.filter((empresa) => {
      const status = empresa.assinatura?.status ?? "sem assinatura";

      const matchBusca =
        !termo ||
        empresa.nome.toLowerCase().includes(termo) ||
        (empresa.documento || "").toLowerCase().includes(termo) ||
        (empresa.assinatura?.plano || "").toLowerCase().includes(termo);

      const matchStatus = filtroStatus === "todos" || status === filtroStatus;

      return matchBusca && matchStatus;
    });
  }, [empresas, busca, filtroStatus]);

  const metricas = useMemo(() => {
    const totalEmpresas = empresas.length;
    const ativas = empresas.filter((e) => e.assinatura?.status === "ativa").length;
    const pendentes = empresas.filter(
      (e) => e.assinatura?.status === "pendente"
    ).length;
    const suspensas = empresas.filter(
      (e) => e.assinatura?.status === "suspensa"
    ).length;
    const atrasadas = empresas.filter(
      (e) => e.assinatura?.status === "atrasada"
    ).length;

    const receitaMensalEstimada = empresas.reduce((total, empresa) => {
      const plano = empresa.assinatura?.plano;
      if (plano === "pro") return total + 49;
      if (plano === "enterprise") return total + 199;
      return total;
    }, 0);

    const planos = {
      free: empresas.filter((e) => e.assinatura?.plano === "free").length,
      pro: empresas.filter((e) => e.assinatura?.plano === "pro").length,
      enterprise: empresas.filter((e) => e.assinatura?.plano === "enterprise")
        .length,
    };

    return {
      totalEmpresas,
      ativas,
      pendentes,
      suspensas,
      atrasadas,
      receitaMensalEstimada,
      planos,
    };
  }, [empresas]);

  if (carregando) {
    return (
      <main className="min-h-screen bg-zinc-100 p-6 md:p-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-zinc-500">Carregando empresas...</p>
        </div>
      </main>
    );
  }

  if (erro) {
    return (
      <main className="min-h-screen bg-zinc-100 p-6 md:p-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <p className="text-sm text-red-700">{erro}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-100 p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Admin • Empresas</h1>
            <p className="mt-1 text-sm text-zinc-500">
              Controle geral das empresas cadastradas no SaaS
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={carregarEmpresas}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Atualizar
            </button>

            <button
              onClick={verificarVencimentos}
              disabled={verificandoVencimentos}
              className="rounded-xl bg-yellow-500 px-4 py-2 text-sm text-white hover:bg-yellow-600 disabled:opacity-60"
            >
              {verificandoVencimentos
                ? "Verificando..."
                : "Verificar vencimentos"}
            </button>

            <button
              onClick={() => router.push("/admin/financeiro")}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Financeiro
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

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <Card titulo="Total de empresas" valor={String(metricas.totalEmpresas)} />
          <Card titulo="Empresas ativas" valor={String(metricas.ativas)} />
          <Card titulo="Pendentes" valor={String(metricas.pendentes)} />
          <Card titulo="Suspensas" valor={String(metricas.suspensas)} />
          <Card
            titulo="Receita estimada"
            valor={`R$ ${metricas.receitaMensalEstimada}`}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">
              Resumo por status
            </h2>

            <div className="mt-4 space-y-3">
              <ResumoLinha
                label="Ativas"
                valor={metricas.ativas}
                total={metricas.totalEmpresas}
              />
              <ResumoLinha
                label="Pendentes"
                valor={metricas.pendentes}
                total={metricas.totalEmpresas}
              />
              <ResumoLinha
                label="Atrasadas"
                valor={metricas.atrasadas}
                total={metricas.totalEmpresas}
              />
              <ResumoLinha
                label="Suspensas"
                valor={metricas.suspensas}
                total={metricas.totalEmpresas}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">
              Distribuição por plano
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <MiniCard titulo="Free" valor={String(metricas.planos.free)} />
              <MiniCard titulo="Pro" valor={String(metricas.planos.pro)} />
              <MiniCard
                titulo="Enterprise"
                valor={String(metricas.planos.enterprise)}
              />
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Buscar empresa
              </label>
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Nome, documento ou plano"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Filtrar por status
              </label>
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900"
              >
                <option value="todos">Todos</option>
                <option value="pendente">Pendente</option>
                <option value="ativa">Ativa</option>
                <option value="teste">Teste</option>
                <option value="atrasada">Atrasada</option>
                <option value="suspensa">Suspensa</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          {empresasFiltradas.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
              Nenhuma empresa encontrada.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-zinc-200">
              <table className="min-w-full bg-white text-sm">
                <thead className="bg-zinc-50">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-semibold text-zinc-700">
                      Empresa
                    </th>
                    <th className="px-4 py-3 font-semibold text-zinc-700">
                      Plano
                    </th>
                    <th className="px-4 py-3 font-semibold text-zinc-700">
                      Status
                    </th>
                    <th className="px-4 py-3 font-semibold text-zinc-700">
                      Vencimento
                    </th>
                    <th className="px-4 py-3 font-semibold text-zinc-700">
                      Usuários
                    </th>
                    <th className="px-4 py-3 font-semibold text-zinc-700">
                      Produtos
                    </th>
                    <th className="px-4 py-3 font-semibold text-zinc-700">
                      Cadastro
                    </th>
                    <th className="px-4 py-3 font-semibold text-zinc-700">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {empresasFiltradas.map((empresa) => {
                    const status = empresa.assinatura?.status;
                    const processando = empresaProcessando === empresa.id;
                    const planoSelecionado =
                      planosSelecionados[empresa.id] || "free";

                    return (
                      <tr key={empresa.id} className="border-t border-zinc-100">
                        <td className="px-4 py-4">
                          <p className="font-medium text-zinc-900">
                            {empresa.nome}
                          </p>
                          <p className="text-xs text-zinc-500">
                            {formatarDocumento(
                              empresa.tipoDocumento,
                              empresa.documento
                            )}
                          </p>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex flex-col gap-2">
                            <span className="text-zinc-700">
                              {empresa.assinatura?.plano || "-"}
                            </span>

                            <select
                              value={planoSelecionado}
                              onChange={(e) =>
                                setPlanosSelecionados((prev) => ({
                                  ...prev,
                                  [empresa.id]: e.target.value as PlanoAssinatura,
                                }))
                              }
                              className="rounded-lg border border-zinc-300 px-2 py-1 text-xs text-zinc-700"
                            >
                              <option value="free">free</option>
                              <option value="pro">pro</option>
                              <option value="enterprise">enterprise</option>
                            </select>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${classeStatus(
                              status
                            )}`}
                          >
                            {status || "sem assinatura"}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-zinc-600">
                          {empresa.assinatura?.dataVencimento
                            ? new Date(
                                empresa.assinatura.dataVencimento
                              ).toLocaleDateString("pt-BR")
                            : "-"}
                        </td>

                        <td className="px-4 py-4 text-zinc-600">
                          {empresa.totalUsuarios}
                        </td>

                        <td className="px-4 py-4 text-zinc-600">
                          {empresa.totalProdutos}
                        </td>

                        <td className="px-4 py-4 text-zinc-600">
                          {new Date(empresa.createdAt).toLocaleDateString(
                            "pt-BR"
                          )}
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() =>
                                router.push(`/admin/empresas/${empresa.id}/usuarios`)
                              }
                              className="rounded-lg bg-zinc-700 px-3 py-2 text-xs font-medium text-white hover:bg-zinc-800"
                            >
                              Usuários
                            </button>

                            {status === "pendente" && (
                              <button
                                onClick={() => liberarEmpresa(empresa.id)}
                                disabled={processando}
                                className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
                              >
                                {processando ? "Processando..." : "Liberar"}
                              </button>
                            )}

                            <button
                              onClick={() => renovarEmpresa(empresa.id)}
                              disabled={processando}
                              className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                            >
                              {processando ? "Processando..." : "Renovar"}
                            </button>

                            {status !== "suspensa" ? (
                              <button
                                onClick={() => suspenderEmpresa(empresa.id)}
                                disabled={processando}
                                className="rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-60"
                              >
                                {processando ? "Processando..." : "Suspender"}
                              </button>
                            ) : (
                              <button
                                onClick={() => reativarEmpresa(empresa.id)}
                                disabled={processando}
                                className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
                              >
                                {processando ? "Processando..." : "Reativar"}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
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

function MiniCard({
  titulo,
  valor,
}: {
  titulo: string;
  valor: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
      <p className="text-sm text-zinc-500">{titulo}</p>
      <p className="mt-2 text-xl font-bold text-zinc-900">{valor}</p>
    </div>
  );
}

function ResumoLinha({
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