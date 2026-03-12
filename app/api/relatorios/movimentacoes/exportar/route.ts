import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

function escaparCsv(valor: string | number | null | undefined) {
  const texto = String(valor ?? "");
  const seguro = texto.replace(/"/g, '""');
  return `"${seguro}"`;
}

export async function GET(req: Request) {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return new Response("Não autenticado", { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const productId = String(searchParams.get("productId") ?? "").trim();
    const tipo = String(searchParams.get("tipo") ?? "").trim().toLowerCase();
    const dataInicio = String(searchParams.get("dataInicio") ?? "").trim();
    const dataFim = String(searchParams.get("dataFim") ?? "").trim();

    const where: {
      empresaId: string;
      productId?: string;
      tipo?: string;
      createdAt?: {
        gte?: Date;
        lte?: Date;
      };
    } = {
      empresaId: usuario.empresaId,
    };

    if (productId) {
      where.productId = productId;
    }

    if (tipo === "entrada" || tipo === "saida") {
      where.tipo = tipo;
    }

    if (dataInicio || dataFim) {
      where.createdAt = {};
    }

    if (dataInicio) {
      where.createdAt = {
        ...where.createdAt,
        gte: new Date(`${dataInicio}T00:00:00`),
      };
    }

    if (dataFim) {
      where.createdAt = {
        ...where.createdAt,
        lte: new Date(`${dataFim}T23:59:59.999`),
      };
    }

    const movimentacoes = await prisma.stockMovement.findMany({
      where,
      include: {
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
      "Produto",
      "SKU",
      "CodigoBarras",
      "Tipo",
      "Quantidade",
      "Observacao",
      "Data",
    ];

    const linhas = movimentacoes.map((mov) => [
      escaparCsv(mov.product.nome),
      escaparCsv(mov.product.sku),
      escaparCsv(mov.product.codigoBarras),
      escaparCsv(mov.tipo),
      escaparCsv(mov.quantidade),
      escaparCsv(mov.observacao),
      escaparCsv(new Date(mov.createdAt).toLocaleString("pt-BR")),
    ]);

    const csv = [
      cabecalho.join(","),
      ...linhas.map((linha) => linha.join(",")),
    ].join("\n");

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition":
          'attachment; filename="relatorio-movimentacoes.csv"',
      },
    });
  } catch (error) {
    console.error("Erro ao exportar relatório de movimentações:", error);

    return new Response("Erro ao exportar relatório de movimentações", {
      status: 500,
    });
  }
}