import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const solicitacao = await prisma.solicitacao.findUnique({
      where: { id },
    });

    if (!solicitacao) {
      return NextResponse.json(
        { error: "Solicitação não encontrada" },
        { status: 404 }
      );
    }

    if (solicitacao.status !== "pendente") {
      return NextResponse.json(
        { error: "Só é possível cancelar solicitações pendentes" },
        { status: 400 }
      );
    }

    const atualizada = await prisma.solicitacao.update({
      where: { id },
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