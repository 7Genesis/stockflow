"use client";

import { useEffect, useMemo, useState } from "react";

type Atividade = {
  id: string;
  acao: string;
  entidade: string;
  entidadeId: string | null;
  descricao: string | null;
  createdAt: string;
  user: {
    id: string;
    nome: string;
    email: string;
  };
};

export default function AtividadePage() {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [filtroAcao, setFiltroAcao] = useState("todas");

  async function carregarAtividades() {
    try {
      setCarregando(true);
      setErro("");

      const response = await fetch("/api/atividade", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Erro ao carregar atividades");
        return;
      }

      setAtividades(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar atividades:", error);
      setErro("Erro ao carregar atividades");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarAtividades();
  }, []);

  const atividadesFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return atividades.filter((atividade) => {
      const matchBusca =
        atividade.user.nome.toLowerCase().includes(termo) ||
        atividade.user.email.toLowerCase().includes(termo) ||
        atividade.acao.toLowerCase().includes(termo) ||
        atividade.entidade.toLowerCase().includes(termo) ||
        (atividade.descricao || "").toLowerCase().includes(termo);

      const matchAcao =
        filtroAcao === "todas" || atividade.acao === filtroAcao;

      return matchBusca && matchAcao;
    });
  }, [atividades, busca, filtroAcao]);

  function labelAcao(acao: string) {
    if (acao === "criar") return "Criação";
    if (acao === "editar") return "Edição";
    if (acao === "excluir") return "Exclusão";
    if (acao === "aprovar") return "Aprovação";
    if (acao === "recusar") return "Recusa";
    if (acao === "cancelar") return "Cancelamento";
    return acao;
  }

  function classeAcao(acao: string) {
    if (acao === "criar") return "bg-emerald-100 text-emerald-700";
    if (acao === "editar") return "bg-blue-100 text-blue-700";
    if (acao === "excluir") return "bg-red-100 text-red-700";
    if (acao === "aprovar") return "bg-green-100 text-green-700";
    if (acao === "recusar") return "bg-orange-100 text-orange-700";
    if (acao === "cancelar") return "bg-zinc-200 text-zinc-700";
    return "bg-zinc-100 text-zinc-700";
  }

  if (carregando) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">Carregando atividades...</p>
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Atividade</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Histórico recente das ações realizadas no sistema
          </p>
        </div>

        <button
          onClick={carregarAtividades}
          className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
        >
          Atualizar
        </button>
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Buscar
            </label>
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Usuário, ação, entidade ou descrição"
              className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Filtrar por ação
            </label>
            <select
              value={filtroAcao}
              onChange={(e) => setFiltroAcao(e.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900"
            >
              <option value="todas">Todas</option>
              <option value="criar">Criação</option>
              <option value="editar">Edição</option>
              <option value="excluir">Exclusão</option>
              <option value="aprovar">Aprovação</option>
              <option value="recusar">Recusa</option>
              <option value="cancelar">Cancelamento</option>
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        {atividadesFiltradas.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
            Nenhuma atividade encontrada.
          </div>
        ) : (
          <div className="space-y-4">
            {atividadesFiltradas.map((atividade) => (
              <div
                key={atividade.id}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${classeAcao(
                          atividade.acao
                        )}`}
                      >
                        {labelAcao(atividade.acao)}
                      </span>

                      <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700">
                        {atividade.entidade}
                      </span>
                    </div>

                    <p className="text-sm font-medium text-zinc-900">
                      {atividade.descricao || "Sem descrição"}
                    </p>

                    <div className="text-sm text-zinc-500">
                      <p>
                        Usuário:{" "}
                        <span className="font-medium text-zinc-700">
                          {atividade.user.nome}
                        </span>
                      </p>
                      <p>{atividade.user.email}</p>
                    </div>
                  </div>

                  <div className="text-sm text-zinc-500 md:text-right">
                    <p>
                      {new Date(atividade.createdAt).toLocaleString("pt-BR")}
                    </p>

                    {atividade.entidadeId && (
                      <p className="mt-1 break-all text-xs">
                        ID: {atividade.entidadeId}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}