import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";
import { registrarAuditoria } from "@/lib/audit";

export const dynamic = "force-dynamic";

type MovimentacaoBody = {
  productId?: string;
  tipo?: string;
  quantidade?: number | string;
  observacao?: string;
};

export async function GET() {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const movimentacoes = await prisma.stockMovement.findMany({
      where: {
        empresaId: usuario.empresaId,
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

    const body = (await req.json()) as MovimentacaoBody;

    const productId = String(body.productId ?? "").trim();
    const tipo = String(body.tipo ?? "").trim().toLowerCase();
    const quantidade = Number(body.quantidade ?? 0);
    const observacao = String(body.observacao ?? "").trim() || null;

    if (!productId || !tipo) {
      return NextResponse.json(
        { error: "Produto e tipo são obrigatórios" },
        { status: 400 }
      );
    }

    if (tipo !== "entrada" && tipo !== "saida") {
      return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
    }

    if (!quantidade || Number.isNaN(quantidade) || quantidade <= 0) {
      return NextResponse.json(
        { error: "Quantidade inválida" },
        { status: 400 }
      );
    }

    const produto = await prisma.product.findFirst({
      where: {
        id: productId,
        empresaId: usuario.empresaId,
      },
      select: {
        id: true,
        nome: true,
        estoqueAtual: true,
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

    const movimentacao = await prisma.$transaction(async (tx) => {
      const novaMovimentacao = await tx.stockMovement.create({
        data: {
          empresaId: usuario.empresaId,
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

      return novaMovimentacao;
    });

    await registrarAuditoria({
      empresaId: usuario.empresaId,
      userId: usuario.id,
      acao: "criar",
      entidade: "movimentacao",
      entidadeId: movimentacao.id,
      descricao: `Movimentação de ${tipo} no produto ${produto.nome} - quantidade: ${quantidade}`,
    });

    return NextResponse.json({ success: true, movimentacao });
  } catch (error) {
    console.error("Erro ao registrar movimentação:", error);

    return NextResponse.json(
      { error: "Erro ao registrar movimentação" },
      { status: 500 }
    );
  }
}