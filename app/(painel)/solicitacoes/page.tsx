"use client";

import { useEffect, useState } from "react";

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
  status: string;
  createdAt: string;
  user: User;
  product: Produto;
};

export default function SolicitacoesPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);

  const [userId, setUserId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantidade, setQuantidade] = useState("");

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

  async function carregarUsuarios() {
    try {
      const response = await fetch("/api/usuarios", { cache: "no-store" });
      const data = await response.json();

      if (!response.ok) {
        console.error("Erro ao carregar usuários:", data);
        return;
      }

      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  }

  async function carregarSolicitacoes() {
    try {
      const response = await fetch("/api/solicitacoes", { cache: "no-store" });
      const texto = await response.text();

      let data: Solicitacao[] | { error?: string } = [];

      try {
        data = texto ? JSON.parse(texto) : [];
      } catch {
        data = [];
      }

      if (!response.ok) {
        console.error("Erro ao carregar solicitações:", data);
        return;
      }

      setSolicitacoes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar solicitações:", error);
    }
  }

  useEffect(() => {
    carregarProdutos();
    carregarUsuarios();
    carregarSolicitacoes();
  }, []);

  async function salvarSolicitacao() {
    if (!userId || !productId || !quantidade) {
      alert("Selecione usuário, produto e quantidade.");
      return;
    }

    try {
      const response = await fetch("/api/solicitacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId,
          quantidade,
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
        alert((data as { error?: string }).error || "Erro ao criar solicitação");
        return;
      }

      setUserId("");
      setProductId("");
      setQuantidade("");
      await carregarSolicitacoes();
      alert("Solicitação criada com sucesso");
    } catch (error) {
      console.error("Erro ao criar solicitação:", error);
      alert("Erro ao criar solicitação");
    }
  }

  async function aprovarSolicitacao(id: string) {
    try {
      const response = await fetch(`/api/solicitacoes/${id}/aprovar`, {
        method: "PATCH",
      });

      const texto = await response.text();

      let data: { error?: string } | Record<string, unknown> = {};

      try {
        data = texto ? JSON.parse(texto) : {};
      } catch {
        data = {};
      }

      if (!response.ok) {
        alert(
          (data as { error?: string }).error || "Erro ao aprovar solicitação"
        );
        return;
      }

      await carregarSolicitacoes();
      alert("Solicitação aprovada com sucesso");
    } catch (error) {
      console.error("Erro ao aprovar solicitação:", error);
      alert("Erro ao aprovar solicitação");
    }
  }

  function exportarCsv() {
    window.open("/api/solicitacoes/exportar", "_blank");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Solicitações</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Solicite materiais e aprove saídas do estoque
        </p>
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900">
          Nova solicitação
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Usuário</label>
            <select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            >
              <option value="">Selecione</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome}
                </option>
              ))}
            </select>
          </div>

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
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">
              Lista de solicitações
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Acompanhe e exporte as solicitações cadastradas
            </p>
          </div>

          <button
            onClick={exportarCsv}
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
          >
            Exportar CSV
          </button>
        </div>

        {solicitacoes.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhuma solicitação cadastrada.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b text-left text-zinc-500">
                  <th className="p-3">Usuário</th>
                  <th className="p-3">Produto</th>
                  <th className="p-3">Quantidade</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Data</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {solicitacoes.map((solicitacao) => (
                  <tr key={solicitacao.id} className="border-b">
                    <td className="p-3">{solicitacao.user.nome}</td>
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
                          onClick={() => aprovarSolicitacao(solicitacao.id)}
                          className="font-medium text-blue-600 hover:text-blue-800"
                        >
                          Aprovar
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