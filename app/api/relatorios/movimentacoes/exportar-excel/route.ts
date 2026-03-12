import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import * as XLSX from "xlsx";

export const dynamic = "force-dynamic";

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

    const linhas = movimentacoes.map((mov) => ({
      Produto: mov.product.nome,
      SKU: mov.product.sku ?? "",
      CodigoBarras: mov.product.codigoBarras ?? "",
      Tipo: mov.tipo,
      Quantidade: mov.quantidade,
      Observacao: mov.observacao ?? "",
      Data: new Date(mov.createdAt).toLocaleString("pt-BR"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(linhas);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Movimentacoes");

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition":
          'attachment; filename="relatorio-movimentacoes.xlsx"',
      },
    });
  } catch (error) {
    console.error("Erro ao exportar Excel de movimentações:", error);

    return new Response("Erro ao exportar Excel de movimentações", {
      status: 500,
    });
  }
}