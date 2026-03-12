import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
      select: {
        id: true,
        status: true,
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

    await prisma.solicitacao.update({
      where: { id: solicitacao.id },
      data: {
        status: "recusada",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao recusar solicitação:", error);

    return NextResponse.json(
      { error: "Erro ao recusar solicitação" },
      { status: 500 }
    );
  }
}