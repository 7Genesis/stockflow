import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function escaparCsv(valor: string | number | null | undefined) {
  const texto = String(valor ?? "");
  const seguro = texto.replace(/"/g, '""');
  return `"${seguro}"`;
}

export async function GET() {
  try {
    const movimentacoes = await prisma.stockMovement.findMany({
      include: {
        product: {
          select: {
            nome: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const cabecalho = [
      "Produto",
      "Tipo",
      "Quantidade",
      "Observacao",
      "Data",
    ];

    const linhas = movimentacoes.map((mov) => [
      escaparCsv(mov.product.nome),
      escaparCsv(mov.tipo),
      escaparCsv(mov.quantidade),
      escaparCsv(mov.observacao || ""),
      escaparCsv(new Date(mov.createdAt).toLocaleDateString("pt-BR")),
    ]);

    const csv = [
      cabecalho.join(","),
      ...linhas.map((linha) => linha.join(",")),
    ].join("\n");

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="movimentacoes.csv"',
      },
    });
  } catch (error) {
    console.error("Erro ao exportar movimentações:", error);

    return new Response("Erro ao exportar movimentações", {
      status: 500,
    });
  }
}