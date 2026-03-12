import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
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
            id: true,
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

    const totalEntradas = movimentacoes
      .filter((mov) => mov.tipo === "entrada")
      .reduce((acc, mov) => acc + mov.quantidade, 0);

    const totalSaidas = movimentacoes
      .filter((mov) => mov.tipo === "saida")
      .reduce((acc, mov) => acc + mov.quantidade, 0);

    const saldo = totalEntradas - totalSaidas;

    const porProdutoMap = new Map<
      string,
      {
        productId: string;
        nome: string;
        entrada: number;
        saida: number;
      }
    >();

    for (const mov of movimentacoes) {
      const atual = porProdutoMap.get(mov.productId) ?? {
        productId: mov.productId,
        nome: mov.product.nome,
        entrada: 0,
        saida: 0,
      };

      if (mov.tipo === "entrada") {
        atual.entrada += mov.quantidade;
      } else {
        atual.saida += mov.quantidade;
      }

      porProdutoMap.set(mov.productId, atual);
    }

    const porProduto = Array.from(porProdutoMap.values()).sort(
      (a, b) => b.entrada + b.saida - (a.entrada + a.saida)
    );

    const porDiaMap = new Map<
      string,
      {
        data: string;
        entrada: number;
        saida: number;
      }
    >();

    for (const mov of movimentacoes) {
      const data = new Date(mov.createdAt).toLocaleDateString("pt-BR");
      const atual = porDiaMap.get(data) ?? {
        data,
        entrada: 0,
        saida: 0,
      };

      if (mov.tipo === "entrada") {
        atual.entrada += mov.quantidade;
      } else {
        atual.saida += mov.quantidade;
      }

      porDiaMap.set(data, atual);
    }

    const grafico = Array.from(porDiaMap.values()).reverse();

    return NextResponse.json({
      totalMovimentacoes: movimentacoes.length,
      totalEntradas,
      totalSaidas,
      saldo,
      movimentacoes,
      porProduto,
      grafico,
    });
  } catch (error) {
    console.error("Erro ao gerar relatório de movimentações:", error);

    return NextResponse.json(
      { error: "Erro ao gerar relatório de movimentações" },
      { status: 500 }
    );
  }
}