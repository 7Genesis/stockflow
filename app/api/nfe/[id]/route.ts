import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_req: Request, { params }: Params) {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { id } = await params;

    const nota = await prisma.nfeImport.findUnique({
      where: {
        id,
      },
      include: {
        itens: {
          orderBy: {
            descricao: "asc",
          },
        },
      },
    });

    if (!nota) {
      return NextResponse.json(
        { error: "NF-e não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(nota);
  } catch (error) {
    console.error("Erro ao buscar detalhes da NF-e:", error);

    return NextResponse.json(
      { error: "Erro ao buscar detalhes da NF-e" },
      { status: 500 }
    );
  }
}