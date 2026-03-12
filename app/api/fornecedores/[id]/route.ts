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

    const fornecedor = await prisma.fornecedor.findUnique({
      where: { id },
      include: {
        notasFiscais: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            chaveAcesso: true,
            numeroNota: true,
            serie: true,
            fornecedor: true,
            cnpjFornecedor: true,
            dataEmissao: true,
            valorTotal: true,
            createdAt: true,
          },
        },
      },
    });

    if (!fornecedor) {
      return NextResponse.json(
        { error: "Fornecedor não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(fornecedor);
  } catch (error) {
    console.error("Erro ao buscar fornecedor:", error);

    return NextResponse.json(
      { error: "Erro ao buscar fornecedor" },
      { status: 500 }
    );
  }
}