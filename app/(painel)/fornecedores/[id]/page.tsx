"use client";

import { useEffect, useMemo, useState } from "react";

type NotaFiscal = {
  id: string;
  chaveAcesso: string;
  numeroNota: string | null;
  serie: string | null;
  fornecedor: string | null;
  cnpjFornecedor: string | null;
  dataEmissao: string | null;
  valorTotal: number | null;
  createdAt: string;
};

type FornecedorDetalhe = {
  id: string;
  nome: string;
  cnpj: string;
  createdAt: string;
  notasFiscais: NotaFiscal[];
};

function formatarCnpj(cnpj: string) {
  const digits = cnpj.replace(/\D/g, "");

  if (digits.length !== 14) return cnpj;

  return digits.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}

function formatarMoeda(valor: number | null | undefined) {
  if (valor === null || valor === undefined) return "-";

  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarData(data: string | null | undefined) {
  if (!data) return "-";

  return new Date(data).toLocaleString("pt-BR");
}

export default function FornecedorDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [fornecedor, setFornecedor] = useState<FornecedorDetalhe | null>(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        setErro("");

        const { id } = await params;

        const response = await fetch(`/api/fornecedores/${id}`, {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          setErro(data.error || "Erro ao carregar fornecedor");
          return;
        }

        setFornecedor(data);
      } catch (error) {
        console.error("Erro ao carregar fornecedor:", error);
        setErro("Erro ao carregar fornecedor");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, [params]);

  const totalNotas = fornecedor?.notasFiscais.length ?? 0;

  const valorTotalNotas = useMemo(() => {
    if (!fornecedor) return 0;

    return fornecedor.notasFiscais.reduce(
      (total, nota) => total + (nota.valorTotal ?? 0),
      0
    );
  }, [fornecedor]);

  if (carregando) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">Carregando fornecedor...</p>
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

  if (!fornecedor) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">Fornecedor não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">{fornecedor.nome}</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Detalhes do fornecedor e histórico de NF-e
        </p>
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="grid gap-3 md:grid-cols-2">
          <p className="text-sm text-zinc-700">
            <strong>Nome:</strong> {fornecedor.nome}
          </p>
          <p className="text-sm text-zinc-700">
            <strong>CNPJ:</strong> {formatarCnpj(fornecedor.cnpj)}
          </p>
          <p className="text-sm text-zinc-700">
            <strong>Cadastrado em:</strong> {formatarData(fornecedor.createdAt)}
          </p>
          <p className="text-sm text-zinc-700">
            <strong>Total de NF-e:</strong> {totalNotas}
          </p>
          <p className="text-sm text-zinc-700">
            <strong>Valor total em notas:</strong> {formatarMoeda(valorTotalNotas)}
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-zinc-900">
            NF-e do fornecedor
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Histórico de notas importadas vinculadas a este fornecedor
          </p>
        </div>

        {fornecedor.notasFiscais.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
            Nenhuma NF-e vinculada a este fornecedor.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-zinc-200">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-zinc-50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold text-zinc-700">Nota</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">Série</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">Emissão</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">Valor</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">Chave</th>
                </tr>
              </thead>
              <tbody>
                {fornecedor.notasFiscais.map((nota) => (
                  <tr key={nota.id} className="border-t border-zinc-100">
                    <td className="px-4 py-4 font-medium text-zinc-900">
                      {nota.numeroNota ?? "-"}
                    </td>
                    <td className="px-4 py-4 text-zinc-600">
                      {nota.serie ?? "-"}
                    </td>
                    <td className="px-4 py-4 text-zinc-600">
                      {formatarData(nota.dataEmissao)}
                    </td>
                    <td className="px-4 py-4 text-zinc-600">
                      {formatarMoeda(nota.valorTotal)}
                    </td>
                    <td className="px-4 py-4 text-zinc-600 break-all">
                      {nota.chaveAcesso}
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