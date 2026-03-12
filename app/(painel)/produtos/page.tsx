"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
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

export default function ProdutosPage() {
  const searchParams = useSearchParams();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const [nome, setNome] = useState("");
  const [sku, setSku] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [estoqueAtual, setEstoqueAtual] = useState("");
  const [estoqueMinimo, setEstoqueMinimo] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  const [scannerAberto, setScannerAberto] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const [busca, setBusca] = useState("");
  const [filtroEstoque, setFiltroEstoque] = useState<"todos" | "baixo">(
    "todos"
  );
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [ordenacao, setOrdenacao] = useState("nome-asc");
  const [paginaAtual, setPaginaAtual] = useState(1);

  const [modalMovimentacaoAberto, setModalMovimentacaoAberto] = useState(false);
  const [produtoMovimentacao, setProdutoMovimentacao] =
    useState<Produto | null>(null);
  const [tipoMovimentacao, setTipoMovimentacao] = useState<"entrada" | "saida">(
    "entrada"
  );
  const [quantidadeMovimentacao, setQuantidadeMovimentacao] = useState("");
  const [observacaoMovimentacao, setObservacaoMovimentacao] = useState("");
  const [salvandoMovimentacao, setSalvandoMovimentacao] = useState(false);

  const [scannerMovimentacaoAberto, setScannerMovimentacaoAberto] =
    useState(false);
  const [buscandoProdutoScanner, setBuscandoProdutoScanner] = useState(false);
  const [mensagemScanner, setMensagemScanner] = useState("");
  const [erroScanner, setErroScanner] = useState("");
  const [ultimoCodigoScanner, setUltimoCodigoScanner] = useState("");

  const quantidadeMovimentacaoRef = useRef<HTMLInputElement | null>(null);

  const itensPorPagina = 10;

  useEffect(() => {
    const codigoDaUrl = searchParams.get("codigoBarras");
    if (codigoDaUrl) {
      setCodigoBarras(codigoDaUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (modalMovimentacaoAberto) {
      const timer = setTimeout(() => {
        quantidadeMovimentacaoRef.current?.focus();
      }, 80);

      return () => clearTimeout(timer);
    }
  }, [modalMovimentacaoAberto]);

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

  useEffect(() => {
    carregarProdutos();
  }, []);

  useEffect(() => {
    setPaginaAtual(1);
  }, [busca, filtroEstoque, filtroCategoria, ordenacao]);

  function limparFormulario() {
    setEditandoId(null);
    setNome("");
    setSku("");
    setCategoria("");
    setPreco("");
    setEstoqueAtual("");
    setEstoqueMinimo("");
    setCodigoBarras("");
    setScannerAberto(false);
    window.history.replaceState({}, "", "/produtos");
  }

  function preencherFormulario(produto: Produto) {
    setEditandoId(produto.id);
    setNome(produto.nome);
    setSku(produto.sku || "");
    setCategoria(produto.categoria || "");
    setPreco(produto.preco !== null ? String(produto.preco) : "");
    setEstoqueAtual(String(produto.estoqueAtual));
    setEstoqueMinimo(String(produto.estoqueMinimo));
    setCodigoBarras(produto.codigoBarras || "");
    setScannerAberto(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function salvarProduto() {
    if (!nome.trim()) {
      alert("Informe o nome do produto");
      return;
    }

    try {
      setSalvando(true);

      const url = editandoId
        ? `/api/produtos/${editandoId}`
        : "/api/produtos";

      const method = editandoId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          sku,
          categoria,
          preco,
          estoqueAtual,
          estoqueMinimo,
          codigoBarras,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao salvar produto");
        return;
      }

      limparFormulario();
      await carregarProdutos();

      alert(
        editandoId
          ? "Produto atualizado com sucesso"
          : "Produto cadastrado com sucesso"
      );
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto");
    } finally {
      setSalvando(false);
    }
  }

  async function excluirProduto(id: string) {
    const confirmar = window.confirm("Deseja excluir este produto?");
    if (!confirmar) return;

    try {
      const response = await fetch(`/api/produtos/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao excluir produto");
        return;
      }

      if (editandoId === id) {
        limparFormulario();
      }

      await carregarProdutos();
      alert("Produto excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert("Erro ao excluir produto");
    }
  }

  function abrirModalMovimentacao(
    produto: Produto,
    tipo: "entrada" | "saida"
  ) {
    setProdutoMovimentacao(produto);
    setTipoMovimentacao(tipo);
    setQuantidadeMovimentacao("");
    setObservacaoMovimentacao("");
    setModalMovimentacaoAberto(true);
  }

  function fecharModalMovimentacao() {
    setModalMovimentacaoAberto(false);
    setProdutoMovimentacao(null);
    setTipoMovimentacao("entrada");
    setQuantidadeMovimentacao("");
    setObservacaoMovimentacao("");
  }

  async function salvarMovimentacaoRapida() {
    if (!produtoMovimentacao) return;

    const quantidade = Number(quantidadeMovimentacao);

    if (!quantidade || quantidade <= 0) {
      alert("Informe uma quantidade válida.");
      return;
    }

    if (
      tipoMovimentacao === "saida" &&
      quantidade > produtoMovimentacao.estoqueAtual
    ) {
      alert("Quantidade maior que o estoque disponível.");
      return;
    }

    try {
      setSalvandoMovimentacao(true);

      const response = await fetch("/api/movimentacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: produtoMovimentacao.id,
          tipo: tipoMovimentacao,
          quantidade,
          observacao:
            observacaoMovimentacao.trim() ||
            "Movimentação rápida pela tela de produtos",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao registrar movimentação");
        return;
      }

      await carregarProdutos();
      fecharModalMovimentacao();

      alert(
        tipoMovimentacao === "entrada"
          ? "Entrada registrada com sucesso"
          : "Saída registrada com sucesso"
      );
    } catch (error) {
      console.error("Erro ao registrar movimentação:", error);
      alert("Erro ao registrar movimentação");
    } finally {
      setSalvandoMovimentacao(false);
    }
  }

  async function localizarProdutoPorCodigo(codigo: string) {
    const codigoLimpo = codigo.trim();

    if (!codigoLimpo) return;

    try {
      setBuscandoProdutoScanner(true);
      setErroScanner("");
      setMensagemScanner("");
      setUltimoCodigoScanner(codigoLimpo);

      const response = await fetch(
        `/api/produtos/codigo/${encodeURIComponent(codigoLimpo)}`,
        { cache: "no-store" }
      );

      const data = await response.json();

      if (!response.ok) {
        setErroScanner(data.error || "Produto não encontrado");
        return;
      }

      const produto = data as Produto;

      setMensagemScanner(`Produto encontrado: ${produto.nome}`);
      setScannerMovimentacaoAberto(false);
      setProdutoMovimentacao(produto);
      setTipoMovimentacao("entrada");
      setQuantidadeMovimentacao("");
      setObservacaoMovimentacao("Movimentação por scanner");
      setModalMovimentacaoAberto(true);
    } catch (error) {
      console.error("Erro ao localizar produto pelo scanner:", error);
      setErroScanner("Erro ao localizar produto");
    } finally {
      setBuscandoProdutoScanner(false);
    }
  }

  async function exportarCsv() {
    try {
      const response = await fetch("/api/produtos/exportar");

      if (!response.ok) {
        alert("Erro ao exportar produtos");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "produtos.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao exportar produtos:", error);
      alert("Erro ao exportar produtos");
    }
  }

  async function exportarEstoqueBaixoCsv() {
    try {
      const response = await fetch("/api/produtos/estoque-baixo/exportar");

      if (!response.ok) {
        alert("Erro ao exportar estoque baixo");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "estoque-baixo.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao exportar estoque baixo:", error);
      alert("Erro ao exportar estoque baixo");
    }
  }

  const categoriasDisponiveis = useMemo(() => {
    const categoriasUnicas = produtos
      .map((produto) => produto.categoria?.trim() || "")
      .filter((categoria) => categoria !== "");

    return Array.from(new Set(categoriasUnicas)).sort((a, b) =>
      a.localeCompare(b)
    );
  }, [produtos]);

  const produtosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    const filtrados = produtos.filter((produto) => {
      const matchBusca =
        produto.nome.toLowerCase().includes(termo) ||
        (produto.sku || "").toLowerCase().includes(termo) ||
        (produto.codigoBarras || "").toLowerCase().includes(termo) ||
        (produto.categoria || "").toLowerCase().includes(termo);

      const matchEstoque =
        filtroEstoque === "todos" ||
        produto.estoqueAtual <= produto.estoqueMinimo;

      const matchCategoria =
        filtroCategoria === "todas" ||
        (produto.categoria || "") === filtroCategoria;

      return matchBusca && matchEstoque && matchCategoria;
    });

    return [...filtrados].sort((a, b) => {
      switch (ordenacao) {
        case "nome-asc":
          return a.nome.localeCompare(b.nome);
        case "nome-desc":
          return b.nome.localeCompare(a.nome);
        case "estoque-asc":
          return a.estoqueAtual - b.estoqueAtual;
        case "estoque-desc":
          return b.estoqueAtual - a.estoqueAtual;
        case "preco-asc":
          return (a.preco ?? 0) - (b.preco ?? 0);
        case "preco-desc":
          return (b.preco ?? 0) - (a.preco ?? 0);
        default:
          return 0;
      }
    });
  }, [produtos, busca, filtroEstoque, filtroCategoria, ordenacao]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(produtosFiltrados.length / itensPorPagina)
  );

  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;

  const produtosPaginados = produtosFiltrados.slice(indiceInicial, indiceFinal);

  const totalProdutosFiltrados = produtosFiltrados.length;

  const totalEstoqueBaixo = produtosFiltrados.filter(
    (produto) => produto.estoqueAtual <= produto.estoqueMinimo
  ).length;

  const totalCategoriasFiltradas = new Set(
    produtosFiltrados
      .map((produto) => produto.categoria?.trim() || "")
      .filter((categoria) => categoria !== "")
  ).size;

  const valorTotalEstoqueFiltrado = produtosFiltrados.reduce(
    (total, produto) => {
      const precoUnitario = produto.preco ?? 0;
      return total + precoUnitario * produto.estoqueAtual;
    },
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Produtos</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Cadastro, edição e controle de estoque
        </p>
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">
              {editandoId ? "Editar produto" : "Novo produto"}
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {editandoId
                ? "Atualize os dados do produto selecionado."
                : "Cadastre um novo produto no estoque."}
            </p>
          </div>

          {editandoId && (
            <button
              onClick={limparFormulario}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Cancelar edição
            </button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Nome</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-600">SKU</label>
            <input
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
              placeholder="Opcional"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-600">
              Categoria
            </label>
            <input
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-600">Preço</label>
            <input
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>

          {!editandoId && (
            <div>
              <label className="mb-1 block text-sm text-zinc-600">
                Estoque inicial
              </label>
              <input
                type="number"
                value={estoqueAtual}
                onChange={(e) => setEstoqueAtual(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm text-zinc-600">
              Estoque mínimo
            </label>
            <input
              type="number"
              value={estoqueMinimo}
              onChange={(e) => setEstoqueMinimo(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-600">
              Código de barras
            </label>

            <div className="flex gap-2">
              <input
                value={codigoBarras}
                onChange={(e) => setCodigoBarras(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2"
                placeholder="Opcional ou escaneie"
              />

              <button
                type="button"
                onClick={() => setScannerAberto((prev) => !prev)}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100"
              >
                {scannerAberto ? "Fechar" : "Escanear"}
              </button>
            </div>

            <p className="mt-1 text-xs text-zinc-500">
              Se deixar vazio no cadastro, o sistema gera automaticamente.
            </p>
          </div>
        </div>

        {scannerAberto && (
          <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="mb-3">
              <p className="text-sm font-medium text-zinc-700">
                Scanner para código de barras
              </p>
              <p className="text-sm text-zinc-500">
                Leia o código e o campo será preenchido automaticamente.
              </p>
            </div>

            <BarcodeScanner
              onDetected={(codigo) => {
                setCodigoBarras(codigo);
                setScannerAberto(false);
              }}
            />
          </div>
        )}

        <button
          onClick={salvarProduto}
          disabled={salvando}
          className="mt-6 rounded-xl bg-zinc-900 px-6 py-3 text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {salvando
            ? "Salvando..."
            : editandoId
            ? "Atualizar produto"
            : "Salvar produto"}
        </button>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <CardResumo
          titulo="Produtos filtrados"
          valor={String(totalProdutosFiltrados)}
        />
        <CardResumo titulo="Estoque baixo" valor={String(totalEstoqueBaixo)} />
        <CardResumo
          titulo="Categorias"
          valor={String(totalCategoriasFiltradas)}
        />
        <CardResumo
          titulo="Valor estimado"
          valor={valorTotalEstoqueFiltrado.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        />
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">
              Lista de produtos
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {produtosFiltrados.length} produto(s) encontrado(s)
            </p>
          </div>

          <div className="flex w-full max-w-6xl flex-col gap-3 md:flex-row md:items-end">
            <div className="w-full">
              <label className="mb-1 block text-sm text-zinc-600">Buscar</label>
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2"
                placeholder="Nome, SKU, código ou categoria"
              />
            </div>

            <div className="w-full md:max-w-xs">
              <label className="mb-1 block text-sm text-zinc-600">
                Categoria
              </label>
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2"
              >
                <option value="todas">Todas</option>
                {categoriasDisponiveis.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:max-w-xs">
              <label className="mb-1 block text-sm text-zinc-600">
                Ordenar por
              </label>
              <select
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2"
              >
                <option value="nome-asc">Nome A-Z</option>
                <option value="nome-desc">Nome Z-A</option>
                <option value="estoque-asc">Menor estoque</option>
                <option value="estoque-desc">Maior estoque</option>
                <option value="preco-asc">Menor preço</option>
                <option value="preco-desc">Maior preço</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFiltroEstoque("todos")}
                className={`rounded-lg px-3 py-2 text-sm ${
                  filtroEstoque === "todos"
                    ? "bg-zinc-900 text-white"
                    : "border border-zinc-300 text-zinc-700"
                }`}
              >
                Todos
              </button>

              <button
                onClick={() => setFiltroEstoque("baixo")}
                className={`rounded-lg px-3 py-2 text-sm ${
                  filtroEstoque === "baixo"
                    ? "bg-red-600 text-white"
                    : "border border-zinc-300 text-zinc-700"
                }`}
              >
                Estoque baixo
              </button>

              <button
                onClick={exportarCsv}
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
              >
                Exportar CSV
              </button>

              <button
                onClick={() => {
                  setErroScanner("");
                  setMensagemScanner("");
                  setUltimoCodigoScanner("");
                  setScannerMovimentacaoAberto(true);
                }}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700"
              >
                Movimentar por scanner
              </button>

              <button
                onClick={exportarEstoqueBaixoCsv}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Exportar estoque baixo
              </button>
            </div>
          </div>
        </div>

        {produtosFiltrados.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhum produto encontrado.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-zinc-500">
                    <th className="p-3">Nome</th>
                    <th className="p-3">SKU</th>
                    <th className="p-3">Código de barras</th>
                    <th className="p-3">Categoria</th>
                    <th className="p-3">Preço</th>
                    <th className="p-3">Estoque</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {produtosPaginados.map((produto) => (
                    <tr key={produto.id} className="border-b">
                      <td className="p-3">{produto.nome}</td>
                      <td className="p-3">{produto.sku || "-"}</td>
                      <td className="p-3">{produto.codigoBarras || "-"}</td>
                      <td className="p-3">{produto.categoria || "-"}</td>
                      <td className="p-3">
                        {produto.preco !== null
                          ? produto.preco.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })
                          : "-"}
                      </td>
                      <td className="p-3">{produto.estoqueAtual}</td>
                      <td className="p-3">
                        {produto.estoqueAtual <= produto.estoqueMinimo ? (
                          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                            Estoque baixo
                          </span>
                        ) : (
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            OK
                          </span>
                        )}
                      </td>

                      <td className="p-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            onClick={() => preencherFormulario(produto)}
                            className="font-medium text-blue-600 hover:text-blue-800"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() =>
                              abrirModalMovimentacao(produto, "entrada")
                            }
                            className="font-medium text-emerald-600 hover:text-emerald-800"
                          >
                            + Entrada
                          </button>

                          <button
                            onClick={() =>
                              abrirModalMovimentacao(produto, "saida")
                            }
                            className="font-medium text-amber-600 hover:text-amber-800"
                          >
                            - Saída
                          </button>

                          <button
                            onClick={() => excluirProduto(produto.id)}
                            className="font-medium text-red-600 hover:text-red-800"
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-zinc-500">
                Página {paginaAtual} de {totalPaginas}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
                  disabled={paginaAtual === 1}
                  className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Anterior
                </button>

                <button
                  onClick={() =>
                    setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))
                  }
                  disabled={paginaAtual === totalPaginas}
                  className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Próxima
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      {modalMovimentacaoAberto && produtoMovimentacao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-zinc-900">
                {tipoMovimentacao === "entrada" ? "Nova entrada" : "Nova saída"}
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Produto: {produtoMovimentacao.nome}
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Estoque atual: {produtoMovimentacao.estoqueAtual}
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
                  ref={quantidadeMovimentacaoRef}
                  type="number"
                  value={quantidadeMovimentacao}
                  onChange={(e) => setQuantidadeMovimentacao(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      salvarMovimentacaoRapida();
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
                  value={observacaoMovimentacao}
                  onChange={(e) => setObservacaoMovimentacao(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2"
                  placeholder="Opcional"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={fecharModalMovimentacao}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={salvarMovimentacaoRapida}
                disabled={salvandoMovimentacao}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {salvandoMovimentacao ? "Salvando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {scannerMovimentacaoAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-zinc-900">
                  Movimentar por scanner
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Escaneie o código de barras para localizar o produto.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setScannerMovimentacaoAberto(false)}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
              >
                Fechar
              </button>
            </div>

            {mensagemScanner && (
              <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {mensagemScanner}
              </div>
            )}

            {erroScanner && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {erroScanner}
              </div>
            )}

            {ultimoCodigoScanner && (
              <div className="mb-4 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
                Último código lido: <strong>{ultimoCodigoScanner}</strong>
              </div>
            )}

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              {buscandoProdutoScanner ? (
                <p className="text-sm text-zinc-600">Buscando produto...</p>
              ) : (
                <BarcodeScanner
                  onDetected={(codigo) => {
                    localizarProdutoPorCodigo(codigo);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CardResumo({
  titulo,
  valor,
}: {
  titulo: string;
  valor: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-zinc-500">{titulo}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-900">{valor}</p>
    </div>
  );
}