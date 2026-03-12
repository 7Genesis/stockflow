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

    const notas = await prisma.nfeImport.findMany({
      include: {
        fornecedorRef: {
          select: {
            id: true,
            nome: true,
            cnpj: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notas);
  } catch (error) {
    console.error("Erro ao buscar NF-e:", error);

    return NextResponse.json(
      { error: "Erro ao buscar NF-e" },
      { status: 500 }
    );
  }
}