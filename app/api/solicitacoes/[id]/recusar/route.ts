import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";
import { registrarAuditoria } from "@/lib/audit";

export const dynamic = "force-dynamic";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(_req: Request, { params }: Params) {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    if (usuario.role !== "admin") {
      return NextResponse.json(
        { error: "Apenas administradores podem recusar solicitações" },
        { status: 403 }
      );
    }

    const { id } = await params;

    const solicitacao = await prisma.solicitacao.findFirst({
      where: {
        id,
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
    });

    if (!solicitacao) {
      return NextResponse.json(
        { error: "Solicitação não encontrada" },
        { status: 404 }
      );
    }

    if (solicitacao.status !== "pendente") {
      return NextResponse.json(
        { error: "Somente solicitações pendentes podem ser recusadas" },
        { status: 400 }
      );
    }

    const atualizado = await prisma.solicitacao.update({
      where: {
        id: solicitacao.id,
      },
      data: {
        status: "recusada",
      },
      include: {
        product: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    await registrarAuditoria({
      empresaId: usuario.empresaId,
      userId: usuario.id,
      acao: "recusar",
      entidade: "solicitacao",
      entidadeId: solicitacao.id,
      descricao: `Solicitação recusada para o produto ${solicitacao.product.nome}`,
    });

    return NextResponse.json(atualizado);
  } catch (error) {
    console.error("Erro ao recusar solicitação:", error);

    return NextResponse.json(
      { error: "Erro ao recusar solicitação" },
      { status: 500 }
    );
  }
}