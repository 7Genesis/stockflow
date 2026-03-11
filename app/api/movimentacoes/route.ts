import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const movimentacoes = await prisma.stockMovement.findMany({
      where: {
      },
      include: {
        product: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(movimentacoes);
  } catch (error) {
    console.error("Erro ao buscar movimentações:", error);

    return NextResponse.json(
      { error: "Erro ao buscar movimentações" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = (await req.json()) as {
      productId?: string;
      tipo?: string;
      quantidade?: number | string;
      observacao?: string;
    };

    const productId = String(body.productId ?? "").trim();
    const tipo = String(body.tipo ?? "").trim().toLowerCase();
    const quantidade = Number(body.quantidade ?? 0);
    const observacao = String(body.observacao ?? "").trim() || null;

    if (!productId || !tipo || !quantidade) {
      return NextResponse.json(
        { error: "Produto, tipo e quantidade são obrigatórios" },
        { status: 400 }
      );
    }

    if (tipo !== "entrada" && tipo !== "saida") {
      return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
    }

    const produto = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!produto) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    if (tipo === "saida" && produto.estoqueAtual < quantidade) {
      return NextResponse.json(
        { error: "Estoque insuficiente para saída" },
        { status: 400 }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.stockMovement.create({
        data: {
          productId,
          tipo,
          quantidade,
          observacao,
        },
      });

      await tx.product.update({
        where: {
          id: productId,
        },
        data: {
          estoqueAtual:
            tipo === "entrada"
              ? { increment: quantidade }
              : { decrement: quantidade },
        },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao registrar movimentação:", error);

    return NextResponse.json(
      { error: "Erro ao registrar movimentação" },
      { status: 500 }
    );
  }
}