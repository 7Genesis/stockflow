import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const produtos = await prisma.product.findMany({
      where: {
        empresaId: usuario.empresaId,
      },
      select: {
        id: true,
        nome: true,
        estoqueAtual: true,
        estoqueMinimo: true,
      },
      orderBy: {
        nome: "asc",
      },
    });

    const produtosEstoqueBaixo = produtos
      .filter((produto) => produto.estoqueAtual <= produto.estoqueMinimo)
      .sort((a, b) => a.estoqueAtual - b.estoqueAtual)
      .slice(0, 5);

    return NextResponse.json({
      total: produtosEstoqueBaixo.length,
      produtos: produtosEstoqueBaixo,
    });
  } catch (error) {
    console.error("Erro ao buscar alertas de estoque:", error);

    return NextResponse.json(
      { error: "Erro ao buscar alertas de estoque" },
      { status: 500 }
    );
  }
}