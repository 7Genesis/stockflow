import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function escaparCsv(valor: string | number | null | undefined) {
  const texto = String(valor ?? "");
  const seguro = texto.replace(/"/g, '""');
  return `"${seguro}"`;
}

export async function GET() {
  try {
    const solicitacoes = await prisma.solicitacao.findMany({
      include: {
        user: {
          select: {
            nome: true,
            email: true,
          },
        },
        product: {
          select: {
            nome: true,
            sku: true,
            codigoBarras: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const cabecalho = [
      "Usuario",
      "Email",
      "Produto",
      "SKU",
      "CodigoBarras",
      "Quantidade",
      "Status",
      "Data",
    ];

    const linhas = solicitacoes.map((solicitacao) => [
      escaparCsv(solicitacao.user.nome),
      escaparCsv(solicitacao.user.email),
      escaparCsv(solicitacao.product.nome),
      escaparCsv(solicitacao.product.sku),
      escaparCsv(solicitacao.product.codigoBarras),
      escaparCsv(solicitacao.quantidade),
      escaparCsv(solicitacao.status),
      escaparCsv(
        new Date(solicitacao.createdAt).toLocaleDateString("pt-BR")
      ),
    ]);

    const csv = [
      cabecalho.join(","),
      ...linhas.map((linha) => linha.join(",")),
    ].join("\n");

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="solicitacoes.csv"',
      },
    });
  } catch (error) {
    console.error("Erro ao exportar solicitações:", error);

    return new Response("Erro ao exportar solicitações", {
      status: 500,
    });
  }
}