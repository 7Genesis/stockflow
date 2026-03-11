import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(_req: Request, { params }: Params) {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { id } = await params;

    const solicitacao = await prisma.solicitacao.findFirst({
      where: {
        id,
      },
      include: {
        product: true,
      },
    });

    if (!solicitacao) {
      return NextResponse.json(
        { error: "Solicitação não encontrada" },
        { status: 404 }
      );
    }

    if (solicitacao.status !== "pendente") {
      return NextResponse.json(
        { error: "Somente solicitações pendentes podem ser aprovadas" },
        { status: 400 }
      );
    }

    if (solicitacao.product.estoqueAtual < solicitacao.quantidade) {
      return NextResponse.json(
        { error: "Estoque insuficiente para aprovar a solicitação" },
        { status: 400 }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.solicitacao.update({
        where: {
          id: solicitacao.id,
        },
        data: {
          status: "aprovada",
        },
      });

      await tx.product.update({
        where: {
          id: solicitacao.productId,
        },
        data: {
          estoqueAtual: {
            decrement: solicitacao.quantidade,
          },
        },
      });

      await tx.stockMovement.create({
        data: {
          productId: solicitacao.productId,
          tipo: "saida",
          quantidade: solicitacao.quantidade,
          observacao: "Solicitação aprovada",
        },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao aprovar solicitação:", error);

    return NextResponse.json(
      { error: "Erro ao aprovar solicitação" },
      { status: 500 }
    );
  }
}