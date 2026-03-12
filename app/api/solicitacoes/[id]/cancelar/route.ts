import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
      select: {
        id: true,
        userId: true,
        status: true,
      },
    });

    if (!solicitacao) {
      return NextResponse.json(
        { error: "Solicitação não encontrada" },
        { status: 404 }
      );
    }

    const podeCancelar =
      usuario.role === "admin" || solicitacao.userId === usuario.id;

    if (!podeCancelar) {
      return NextResponse.json(
        { error: "Você não tem permissão para cancelar esta solicitação" },
        { status: 403 }
      );
    }

    if (solicitacao.status !== "pendente") {
      return NextResponse.json(
        { error: "Só é possível cancelar solicitações pendentes" },
        { status: 400 }
      );
    }

    const atualizada = await prisma.solicitacao.update({
      where: { id: solicitacao.id },
      data: {
        status: "cancelada",
      },
    });

    return NextResponse.json(atualizada);
  } catch (error) {
    console.error("Erro ao cancelar solicitação:", error);

    return NextResponse.json(
      { error: "Erro ao cancelar solicitação" },
      { status: 500 }
    );
  }
}