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

    if (usuario.role !== "superadmin") {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const historico = await prisma.pagamentoSaas.findMany({
      include: {
        empresa: {
          select: {
            id: true,
            nome: true,
            documento: true,
            tipoDocumento: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(historico);
  } catch (error) {
    console.error("Erro ao buscar histórico financeiro:", error);

    return NextResponse.json(
      { error: "Erro ao buscar histórico financeiro" },
      { status: 500 }
    );
  }
}