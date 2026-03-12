"use client";

import { useEffect, useRef, useState } from "react";

type NfeImportItem = {
  id: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number | null;
  codigo: string | null;
  codigoBarras: string | null;
  ncm: string | null;
  cfop: string | null;
  unidade: string | null;
};

type NfeImport = {
  id: string;
  chaveAcesso: string;
  numeroNota: string | null;
  serie: string | null;
  fornecedor: string | null;
  cnpjFornecedor: string | null;
  dataEmissao: string | null;
  valorTotal: number | null;
  createdAt: string;
  itens?: NfeImportItem[];
};

type PreviewItem = {
  codigo: string | null;
  codigoBarras: string | null;
  descricao: string;
  quantidade: number;
  valorUnitario: number | null;
  ncm: string | null;
  cfop: string | null;
  unidade: string | null;
};

type PreviewData = {
  chaveAcesso: string;
  numeroNota: string | null;
  serie: string | null;
  fornecedor: string | null;
  cnpjFornecedor: string | null;
  dataEmissao: string | null;
  valorTotal: number | null;
  totalItens: number;
  itens: PreviewItem[];
};

type ImportResponse = {
  success: boolean;
  message: string;
  nfe: {
    chaveAcesso: string;
    numeroNota: string | null;
    fornecedor: string | null;
    dataEmissao: string | null;
    valorTotal: number | null;
  };
  resumo: {
    nfeId: string;
    produtosCriados: number;
    produtosAtualizados: number;
    totalItens: number;
  };
};

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

export default function NfePage() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [arquivo, setArquivo] = useState<File | null>(null);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [importando, setImportando] = useState(false);
  const [preVisualizando, setPreVisualizando] = useState(false);
  const [carregandoHistorico, setCarregandoHistorico] = useState(true);

  const [historico, setHistorico] = useState<NfeImport[]>([]);
  const [nfeSelecionada, setNfeSelecionada] = useState<NfeImport | null>(null);

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function carregarHistorico() {
    try {
      setCarregandoHistorico(true);

      const response = await fetch("/api/nfe", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Erro ao carregar histórico de NF-e");
        return;
      }

      setHistorico(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
      setErro("Erro ao carregar histórico de NF-e");
    } finally {
      setCarregandoHistorico(false);
    }
  }

  useEffect(() => {
    carregarHistorico();
  }, []);

  async function verDetalhes(id: string) {
    try {
      setErro("");

      const response = await fetch(`/api/nfe/${id}`, {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Erro ao carregar detalhes da NF-e");
        return;
      }

      setNfeSelecionada(data);
    } catch (error) {
      console.error("Erro ao carregar detalhes da NF-e:", error);
      setErro("Erro ao carregar detalhes da NF-e");
    }
  }

  function abrirSeletorArquivo() {
    inputRef.current?.click();
  }

  async function preVisualizarNfe() {
    if (!arquivo) {
      alert("Selecione um arquivo XML.");
      return;
    }

    try {
      setPreVisualizando(true);
      setErro("");
      setMensagem("");
      setPreview(null);

      const formData = new FormData();
      formData.append("file", arquivo);

      const response = await fetch("/api/nfe/preview", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Erro ao pré-visualizar NF-e");
        return;
      }

      setPreview(data.preview);
    } catch (error) {
      console.error("Erro ao pré-visualizar NF-e:", error);
      setErro("Erro ao pré-visualizar NF-e");
    } finally {
      setPreVisualizando(false);
    }
  }

  async function importarNfe() {
    if (!arquivo) {
      alert("Selecione um arquivo XML.");
      return;
    }

    try {
      setImportando(true);
      setErro("");
      setMensagem("");

      const formData = new FormData();
      formData.append("file", arquivo);

      const response = await fetch("/api/nfe/importar", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as
        | ImportResponse
        | { error?: string };

      if (!response.ok) {
        setErro((data as { error?: string }).error || "Erro ao importar NF-e");
        return;
      }

      const resultado = data as ImportResponse;

      setMensagem(
        [
          resultado.message,
          `Nota: ${resultado.nfe.numeroNota ?? "-"}`,
          `Fornecedor: ${resultado.nfe.fornecedor ?? "-"}`,
          `Itens: ${resultado.resumo.totalItens}`,
          `Produtos criados: ${resultado.resumo.produtosCriados}`,
          `Produtos atualizados: ${resultado.resumo.produtosAtualizados}`,
        ].join(" | ")
      );

      setArquivo(null);
      setPreview(null);
      setNfeSelecionada(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      await carregarHistorico();
    } catch (error) {
      console.error("Erro ao importar NF-e:", error);
      setErro("Erro ao importar NF-e");
    } finally {
      setImportando(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Importação de NF-e</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Importe XML de NF-e para cadastrar materiais e dar entrada no estoque
        </p>
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900">
          Importar XML da NF-e
        </h2>

        <input
          ref={inputRef}
          id="xml-nfe"
          type="file"
          accept=".xml,text/xml,application/xml"
          onChange={(e) => {
            setArquivo(e.target.files?.[0] ?? null);
            setPreview(null);
            setMensagem("");
            setErro("");
          }}
          className="hidden"
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <button
            type="button"
            onClick={abrirSeletorArquivo}
            className="rounded-xl border border-zinc-300 px-6 py-3 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            Selecionar XML
          </button>

          <div className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
            {arquivo ? arquivo.name : "Nenhum arquivo selecionado"}
          </div>

          <button
            onClick={preVisualizarNfe}
            disabled={preVisualizando || !arquivo}
            className="rounded-xl border border-zinc-300 px-6 py-3 text-sm text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {preVisualizando ? "Lendo..." : "Pré-visualizar"}
          </button>

          <button
            onClick={importarNfe}
            disabled={importando || !arquivo}
            className="rounded-xl bg-zinc-900 px-6 py-3 text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {importando ? "Importando..." : "Importar NF-e"}
          </button>
        </div>

        <p className="mt-3 text-xs text-zinc-500">
          Faça a pré-visualização antes de importar para conferir os itens.
        </p>

        {mensagem && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            {mensagem}
          </div>
        )}

        {erro && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {erro}
          </div>
        )}
      </section>

      {preview && (
        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-zinc-900">
              Pré-visualização da NF-e
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Confira os dados antes de importar no estoque
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <p className="text-sm text-zinc-700">
              <strong>Fornecedor:</strong> {preview.fornecedor ?? "-"}
            </p>
            <p className="text-sm text-zinc-700">
              <strong>Número:</strong> {preview.numeroNota ?? "-"}
            </p>
            <p className="text-sm text-zinc-700">
              <strong>Série:</strong> {preview.serie ?? "-"}
            </p>
            <p className="text-sm text-zinc-700">
              <strong>Emissão:</strong> {formatarData(preview.dataEmissao)}
            </p>
            <p className="text-sm text-zinc-700">
              <strong>Valor total:</strong> {formatarMoeda(preview.valorTotal)}
            </p>
            <p className="text-sm text-zinc-700">
              <strong>Total de itens:</strong> {preview.totalItens}
            </p>
          </div>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-zinc-50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold text-zinc-700">Descrição</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">Qtd</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">Valor unit.</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">Código</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">Barras</th>
                </tr>
              </thead>
              <tbody>
                {preview.itens.map((item, index) => (
                  <tr key={`${item.codigo ?? item.descricao}-${index}`} className="border-t border-zinc-100">
                    <td className="px-4 py-4 text-zinc-900">{item.descricao}</td>
                    <td className="px-4 py-4 text-zinc-600">{item.quantidade}</td>
                    <td className="px-4 py-4 text-zinc-600">
                      {formatarMoeda(item.valorUnitario)}
                    </td>
                    <td className="px-4 py-4 text-zinc-600">{item.codigo ?? "-"}</td>
                    <td className="px-4 py-4 text-zinc-600">{item.codigoBarras ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900">
                Histórico de importações
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Notas importadas recentemente
              </p>
            </div>

            <button
              onClick={carregarHistorico}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Atualizar
            </button>
          </div>

          {carregandoHistorico ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
              Carregando histórico...
            </div>
          ) : historico.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
              Nenhuma NF-e importada ainda.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-zinc-200">
              <table className="min-w-full bg-white text-sm">
                <thead className="bg-zinc-50">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-semibold text-zinc-700">Nota</th>
                    <th className="px-4 py-3 font-semibold text-zinc-700">Fornecedor</th>
                    <th className="px-4 py-3 font-semibold text-zinc-700">Emissão</th>
                    <th className="px-4 py-3 font-semibold text-zinc-700">Valor</th>
                    <th className="px-4 py-3 font-semibold text-zinc-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {historico.map((nfe) => (
                    <tr key={nfe.id} className="border-t border-zinc-100">
                      <td className="px-4 py-4 text-zinc-900">
                        <div className="font-medium">Nº {nfe.numeroNota ?? "-"}</div>
                        <div className="text-xs text-zinc-500">Série {nfe.serie ?? "-"}</div>
                      </td>
                      <td className="px-4 py-4 text-zinc-600">{nfe.fornecedor ?? "-"}</td>
                      <td className="px-4 py-4 text-zinc-600">{formatarData(nfe.dataEmissao)}</td>
                      <td className="px-4 py-4 text-zinc-600">{formatarMoeda(nfe.valorTotal)}</td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => verDetalhes(nfe.id)}
                          className="font-medium text-blue-600 hover:text-blue-800"
                        >
                          Ver detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-zinc-900">
              Detalhes da NF-e
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Visualize os itens da importação selecionada
            </p>
          </div>

          {!nfeSelecionada ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
              Selecione uma NF-e no histórico para ver os detalhes.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-sm text-zinc-600">
                  <strong>Fornecedor:</strong> {nfeSelecionada.fornecedor ?? "-"}
                </p>
                <p className="text-sm text-zinc-600">
                  <strong>Número:</strong> {nfeSelecionada.numeroNota ?? "-"}
                </p>
                <p className="text-sm text-zinc-600">
                  <strong>Série:</strong> {nfeSelecionada.serie ?? "-"}
                </p>
                <p className="text-sm text-zinc-600">
                  <strong>Emissão:</strong> {formatarData(nfeSelecionada.dataEmissao)}
                </p>
                <p className="text-sm text-zinc-600">
                  <strong>Valor total:</strong> {formatarMoeda(nfeSelecionada.valorTotal)}
                </p>
                <p className="break-all text-sm text-zinc-600">
                  <strong>Chave:</strong> {nfeSelecionada.chaveAcesso}
                </p>
              </div>

              {!nfeSelecionada.itens || nfeSelecionada.itens.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
                  Nenhum item encontrado nesta importação.
                </div>
              ) : (
                <div className="space-y-3">
                  {nfeSelecionada.itens.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-zinc-200 bg-white p-4"
                    >
                      <p className="font-medium text-zinc-900">{item.descricao}</p>
                      <div className="mt-2 space-y-1 text-sm text-zinc-600">
                        <p><strong>Quantidade:</strong> {item.quantidade}</p>
                        <p><strong>Valor unitário:</strong> {formatarMoeda(item.valorUnitario)}</p>
                        <p><strong>Código:</strong> {item.codigo ?? "-"}</p>
                        <p><strong>Código de barras:</strong> {item.codigoBarras ?? "-"}</p>
                        <p><strong>NCM:</strong> {item.ncm ?? "-"}</p>
                        <p><strong>CFOP:</strong> {item.cfop ?? "-"}</p>
                        <p><strong>Unidade:</strong> {item.unidade ?? "-"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}