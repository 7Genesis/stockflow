import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ codigo: string }> }
) {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { codigo } = await params;
    const codigoLimpo = decodeURIComponent(codigo).trim();

    if (!codigoLimpo) {
      return NextResponse.json(
        { error: "Código de barras inválido" },
        { status: 400 }
      );
    }

    const produto = await prisma.product.findFirst({
      where: {
        empresaId: usuario.empresaId,
        codigoBarras: codigoLimpo,
      },
      select: {
        id: true,
        nome: true,
        sku: true,
        codigoBarras: true,
        categoria: true,
        preco: true,
        estoqueAtual: true,
        estoqueMinimo: true,
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
    console.error("Erro ao buscar produto por código:", error);

    return NextResponse.json(
      { error: "Erro ao buscar produto por código" },
      { status: 500 }
    );
  }
}