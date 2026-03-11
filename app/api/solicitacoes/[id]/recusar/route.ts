import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
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
        { error: "Somente solicitações pendentes podem ser recusadas" },
        { status: 400 }
      );
    }

    await prisma.solicitacao.update({
      where: { id },
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