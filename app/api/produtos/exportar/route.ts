import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function escaparCsv(valor: string | number | null | undefined) {
  const texto = String(valor ?? "");
  const seguro = texto.replace(/"/g, '""');
  return `"${seguro}"`;
}

export async function GET() {
  try {
    const produtos = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const cabecalho = [
      "Nome",
      "SKU",
      "CodigoBarras",
      "Categoria",
      "Preco",
      "EstoqueAtual",
      "EstoqueMinimo",
      "DataCadastro",
    ];

    const linhas = produtos.map((produto) => [
      escaparCsv(produto.nome),
      escaparCsv(produto.sku),
      escaparCsv(produto.codigoBarras),
      escaparCsv(produto.categoria),
      escaparCsv(produto.preco),
      escaparCsv(produto.estoqueAtual),
      escaparCsv(produto.estoqueMinimo),
      escaparCsv(new Date(produto.createdAt).toLocaleDateString("pt-BR")),
    ]);

    const csv = [
      cabecalho.join(","),
      ...linhas.map((linha) => linha.join(",")),
    ].join("\n");

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="produtos.csv"',
      },
    });
  } catch (error) {
    console.error("Erro ao exportar produtos:", error);

    return new Response("Erro ao exportar produtos", {
      status: 500,
    });
  }
}