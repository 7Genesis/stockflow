"use client";

import { useEffect, useRef, useState } from "react";
import BarcodeScanner from "@/components/BarcodeScanner";

type Produto = {
  id: string;
  nome: string;
  sku: string | null;
  codigoBarras: string | null;
  categoria: string | null;
  preco: number | null;
  estoqueAtual: number;
  estoqueMinimo: number;
};

type LogItem = {
  id: string;
  nome: string;
  quantidade: number;
  tipo: "entrada" | "saida";
  horario: string;
  status: "sucesso" | "erro";
  mensagem?: string;
};

type ModoScanner = "saida_automatica" | "entrada_automatica" | "abrir_modal";

export default function ScannerPage() {
  const [scannerAtivo, setScannerAtivo] = useState(true);
  const [processando, setProcessando] = useState(false);
  const [mensagem, setMensagem] = useState("Aponte a câmera para o código.");
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [modoScanner, setModoScanner] =
    useState<ModoScanner>("saida_automatica");

  const [modalAberto, setModalAberto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    null
  );
  const [tipoMovimentacao, setTipoMovimentacao] = useState<"entrada" | "saida">(
    "saida"
  );
  const [quantidade, setQuantidade] = useState("1");
  const [observacao, setObservacao] = useState("");
  const [salvandoMovimentacao, setSalvandoMovimentacao] = useState(false);

  const bloqueioRef = useRef(false);
  const quantidadeRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      bloqueioRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (modalAberto) {
      const timer = setTimeout(() => {
        quantidadeRef.current?.focus();
        quantidadeRef.current?.select();
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [modalAberto]);

  function adicionarLog(item: LogItem) {
    setLogs((atual) => [item, ...atual].slice(0, 12));
  }

  async function buscarProdutoPorCodigo(codigo: string) {
    const response = await fetch(
      `/api/produtos/codigo/${encodeURIComponent(codigo)}`,
      { cache: "no-store" }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Produto não encontrado");
    }

    return data as Produto;
  }

  async function registrarMovimentacao(params: {
    productId: string;
    tipo: "entrada" | "saida";
    quantidade: number;
    observacao: string;
  }) {
    const response = await fetch("/api/movimentacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erro ao registrar movimentação");
    }

    return data;
  }

  function abrirModal(produto: Produto) {
    setProdutoSelecionado(produto);
    setTipoMovimentacao("saida");
    setQuantidade("1");
    setObservacao("Movimentação via scanner");
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setProdutoSelecionado(null);
    setTipoMovimentacao("saida");
    setQuantidade("1");
    setObservacao("");
  }

  async function confirmarMovimentacaoModal() {
    if (!produtoSelecionado) return;

    const quantidadeNumero = Number(quantidade);

    if (!quantidadeNumero || quantidadeNumero <= 0) {
      alert("Informe uma quantidade válida.");
      return;
    }

    if (
      tipoMovimentacao === "saida" &&
      quantidadeNumero > produtoSelecionado.estoqueAtual
    ) {
      alert("Quantidade maior que o estoque disponível.");
      return;
    }

    try {
      setSalvandoMovimentacao(true);

      await registrarMovimentacao({
        productId: produtoSelecionado.id,
        tipo: tipoMovimentacao,
        quantidade: quantidadeNumero,
        observacao: observacao.trim() || "Movimentação via scanner",
      });

      setMensagem(
        `${
          tipoMovimentacao === "entrada" ? "Entrada" : "Saída"
        } registrada: ${produtoSelecionado.nome}`
      );

      adicionarLog({
        id: `${Date.now()}-${produtoSelecionado.id}`,
        nome: produtoSelecionado.nome,
        quantidade: quantidadeNumero,
        tipo: tipoMovimentacao,
        horario: new Date().toLocaleTimeString("pt-BR"),
        status: "sucesso",
      });

      fecharModal();
    } catch (error) {
      const mensagemErro =
        error instanceof Error ? error.message : "Erro ao registrar movimentação";

      alert(mensagemErro);

      adicionarLog({
        id: `${Date.now()}-erro-modal`,
        nome: produtoSelecionado.nome,
        quantidade: quantidadeNumero,
        tipo: tipoMovimentacao,
        horario: new Date().toLocaleTimeString("pt-BR"),
        status: "erro",
        mensagem: mensagemErro,
      });
    } finally {
      setSalvandoMovimentacao(false);
    }
  }

  async function processarCodigo(codigo: string) {
    const codigoLimpo = codigo.trim();

    if (!codigoLimpo || bloqueioRef.current) return;

    try {
      bloqueioRef.current = true;
      setProcessando(true);
      setMensagem("Buscando produto...");

      const produto = await buscarProdutoPorCodigo(codigoLimpo);

      if (modoScanner === "abrir_modal") {
        setMensagem(`Produto encontrado: ${produto.nome}`);
        abrirModal(produto);
        return;
      }

      const tipo = modoScanner === "entrada_automatica" ? "entrada" : "saida";

      if (tipo === "saida" && produto.estoqueAtual < 1) {
        throw new Error("Produto sem estoque disponível para saída.");
      }

      setMensagem(
        `Produto encontrado: ${produto.nome}. Registrando ${
          tipo === "entrada" ? "entrada" : "saída"
        }...`
      );

      await registrarMovimentacao({
        productId: produto.id,
        tipo,
        quantidade: 1,
        observacao:
          tipo === "entrada"
            ? "Entrada automática via scanner"
            : "Saída automática via scanner",
      });

      const estoqueApos =
        tipo === "entrada"
          ? produto.estoqueAtual + 1
          : Math.max(produto.estoqueAtual - 1, 0);

      setMensagem(
        `${
          tipo === "entrada" ? "Entrada" : "Saída"
        } registrada: ${produto.nome} | Estoque atual: ${estoqueApos}`
      );

      adicionarLog({
        id: `${Date.now()}-${produto.id}`,
        nome: produto.nome,
        quantidade: 1,
        tipo,
        horario: new Date().toLocaleTimeString("pt-BR"),
        status: "sucesso",
      });
    } catch (error) {
      const mensagemErro =
        error instanceof Error ? error.message : "Erro ao processar leitura";

      setMensagem(mensagemErro);

      adicionarLog({
        id: `${Date.now()}-erro`,
        nome: codigoLimpo,
        quantidade: 1,
        tipo: "saida",
        horario: new Date().toLocaleTimeString("pt-BR"),
        status: "erro",
        mensagem: mensagemErro,
      });
    } finally {
      setProcessando(false);

      setTimeout(() => {
        bloqueioRef.current = false;
      }, 1800);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Scanner</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Movimentação rápida por leitura de código de barras
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900">
                Leitura por câmera
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Escolha como a leitura deve se comportar
              </p>
            </div>

            <button
              type="button"
              onClick={() => setScannerAtivo((valor) => !valor)}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              {scannerAtivo ? "Pausar scanner" : "Ativar scanner"}
            </button>
          </div>

          <div className="mb-4 grid gap-4 md:grid-cols-3">
            <button
              type="button"
              onClick={() => setModoScanner("saida_automatica")}
              className={`rounded-xl px-4 py-3 text-sm font-medium ${
                modoScanner === "saida_automatica"
                  ? "bg-red-600 text-white"
                  : "border border-zinc-300 text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              Saída automática
            </button>

            <button
              type="button"
              onClick={() => setModoScanner("entrada_automatica")}
              className={`rounded-xl px-4 py-3 text-sm font-medium ${
                modoScanner === "entrada_automatica"
                  ? "bg-emerald-600 text-white"
                  : "border border-zinc-300 text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              Entrada automática
            </button>

            <button
              type="button"
              onClick={() => setModoScanner("abrir_modal")}
              className={`rounded-xl px-4 py-3 text-sm font-medium ${
                modoScanner === "abrir_modal"
                  ? "bg-zinc-900 text-white"
                  : "border border-zinc-300 text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              Abrir modal
            </button>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            {scannerAtivo ? (
              <BarcodeScanner
                onDetected={(codigo) => {
                  processarCodigo(codigo);
                }}
              />
            ) : (
              <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white text-sm text-zinc-500">
                Scanner pausado
              </div>
            )}
          </div>

          <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-sm font-medium text-zinc-900">Modo atual</p>
            <p className="mt-2 text-sm text-zinc-600">
              {modoScanner === "saida_automatica" && "Saída automática de 1 unidade"}
              {modoScanner === "entrada_automatica" &&
                "Entrada automática de 1 unidade"}
              {modoScanner === "abrir_modal" &&
                "Abre o modal para escolher tipo, quantidade e observação"}
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-sm font-medium text-zinc-900">Status</p>
            <p
              className={`mt-2 text-sm ${
                processando ? "text-amber-600" : "text-zinc-600"
              }`}
            >
              {mensagem}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-zinc-900">
              Últimas leituras
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Histórico rápido da sessão
            </p>
          </div>

          {logs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
              Nenhuma leitura realizada ainda.
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-zinc-900">{item.nome}</p>
                    <span className="text-xs text-zinc-500">{item.horario}</span>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "sucesso"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status === "sucesso" ? "Sucesso" : "Erro"}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.tipo === "entrada"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.tipo} {item.quantidade}
                    </span>
                  </div>

                  {item.mensagem && (
                    <p className="mt-2 text-sm text-red-600">{item.mensagem}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {modalAberto && produtoSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-zinc-900">
                Movimentação via scanner
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Produto: {produtoSelecionado.nome}
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Estoque atual: {produtoSelecionado.estoqueAtual}
              </p>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="mb-1 block text-sm text-zinc-600">Tipo</label>
                <select
                  value={tipoMovimentacao}
                  onChange={(e) =>
                    setTipoMovimentacao(e.target.value as "entrada" | "saida")
                  }
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2"
                >
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm text-zinc-600">
                  Quantidade
                </label>
                <input
                  ref={quantidadeRef}
                  type="number"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      confirmarMovimentacaoModal();
                    }
                  }}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2"
                  placeholder="Digite a quantidade"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-zinc-600">
                  Observação
                </label>
                <input
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2"
                  placeholder="Opcional"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={fecharModal}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={confirmarMovimentacaoModal}
                disabled={salvandoMovimentacao}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {salvandoMovimentacao ? "Salvando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}