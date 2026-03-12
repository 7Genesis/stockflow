"use client";

import { useEffect, useMemo, useState } from "react";

type Fornecedor = {
  id: string;
  nome: string;
  cnpj: string;
  createdAt: string;
  _count?: {
    notasFiscais: number;
  };
};

function formatarCnpj(cnpj: string) {
  const digits = cnpj.replace(/\D/g, "");

  if (digits.length !== 14) return cnpj;

  return digits.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}

export default function FornecedoresPage() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarFornecedores() {
    try {
      setCarregando(true);
      setErro("");

      const response = await fetch("/api/fornecedores", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Erro ao carregar fornecedores");
        return;
      }

      setFornecedores(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar fornecedores:", error);
      setErro("Erro ao carregar fornecedores");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarFornecedores();
  }, []);

  const fornecedoresFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) return fornecedores;

    return fornecedores.filter((fornecedor) => {
      return (
        fornecedor.nome.toLowerCase().includes(termo) ||
        fornecedor.cnpj.toLowerCase().includes(termo)
      );
    });
  }, [fornecedores, busca]);

  const totalFornecedores = fornecedores.length;
  const totalNotas = fornecedores.reduce(
    (acc, item) => acc + (item._count?.notasFiscais ?? 0),
    0
  );

  if (carregando) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">Carregando fornecedores...</p>
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
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Fornecedores</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Fornecedores identificados automaticamente pelas NF-e importadas
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <CardResumo titulo="Fornecedores cadastrados" valor={totalFornecedores} />
        <CardResumo titulo="NF-e vinculadas" valor={totalNotas} />
        <CardResumo
          titulo="Resultado da busca"
          valor={fornecedoresFiltrados.length}
        />
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">
              Lista de fornecedores
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Histórico de fornecedores vindos das notas fiscais
            </p>
          </div>

          <div className="w-full md:max-w-sm">
            <label className="mb-1 block text-sm text-zinc-600">Buscar</label>
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Nome ou CNPJ"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>
        </div>

        {fornecedoresFiltrados.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
            Nenhum fornecedor encontrado.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-zinc-200">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-zinc-50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold text-zinc-700">
                    Nome
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">
                    CNPJ
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">
                    NF-e vinculadas
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">
                    Cadastro
                  </th>
                </tr>
              </thead>
              <tbody>
                {fornecedoresFiltrados.map((fornecedor) => (
                  <tr key={fornecedor.id} className="border-t border-zinc-100">
                    <td className="px-4 py-4 font-medium text-zinc-900">
                    <a
                        href={`/fornecedores/${fornecedor.id}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                        {fornecedor.nome}
                    </a>
                    </td>
                    <td className="px-4 py-4 text-zinc-600">
                      {formatarCnpj(fornecedor.cnpj)}
                    </td>
                    <td className="px-4 py-4 text-zinc-600">
                      {fornecedor._count?.notasFiscais ?? 0}
                    </td>
                    <td className="px-4 py-4 text-zinc-600">
                      {new Date(fornecedor.createdAt).toLocaleString("pt-BR")}
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

function CardResumo({
  titulo,
  valor,
}: {
  titulo: string;
  valor: number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-zinc-500">{titulo}</p>
      <p className="mt-2 text-3xl font-semibold text-zinc-900">{valor}</p>
    </div>
  );
}