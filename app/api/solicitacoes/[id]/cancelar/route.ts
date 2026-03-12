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
        { error: "Somente solicitações pendentes podem ser canceladas" },
        { status: 400 }
      );
    }

    const isAdmin = usuario.role === "admin";
    const isDonoDaSolicitacao = solicitacao.userId === usuario.id;

    if (!isAdmin && !isDonoDaSolicitacao) {
      return NextResponse.json(
        { error: "Sem permissão para cancelar esta solicitação" },
        { status: 403 }
      );
    }

    const atualizado = await prisma.solicitacao.update({
      where: {
        id: solicitacao.id,
      },
      data: {
        status: "cancelada",
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
      acao: "cancelar",
      entidade: "solicitacao",
      entidadeId: solicitacao.id,
      descricao: `Solicitação cancelada para o produto ${solicitacao.product.nome}`,
    });

    return NextResponse.json(atualizado);
  } catch (error) {
    console.error("Erro ao cancelar solicitação:", error);

    return NextResponse.json(
      { error: "Erro ao cancelar solicitação" },
      { status: 500 }
    );
  }
}