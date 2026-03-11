import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Params = {
  params: Promise<{
    codigo: string;
  }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    const { codigo } = await params;

    const codigoNormalizado = decodeURIComponent(codigo).trim();

    if (!codigoNormalizado) {
      return NextResponse.json(
        { error: "Código de barras inválido" },
        { status: 400 }
      );
    }

    const produto = await prisma.product.findFirst({
      where: {
        codigoBarras: codigoNormalizado,
      },
    });

    if (!produto) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(produto);
  } catch (error) {
    console.error("Erro ao buscar produto pelo código:", error);

    return NextResponse.json(
      { error: "Erro ao buscar produto pelo código" },
      { status: 500 }
    );
  }
}