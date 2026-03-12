import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const atividades = await prisma.auditLog.findMany({
      where: {
        empresaId: usuario.empresaId,
      },
      include: {
        user: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100,
    });

    return NextResponse.json(atividades);
  } catch (error) {
    console.error("Erro ao buscar atividade:", error);

    return NextResponse.json(
      { error: "Erro ao buscar atividade" },
      { status: 500 }
    );
  }
}