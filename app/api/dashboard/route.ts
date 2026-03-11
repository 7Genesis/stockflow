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

    const produtos = await prisma.product.findMany({
      where: {
      },
      orderBy: {
        nome: "asc",
      },
    });

    const movimentacoes = await prisma.stockMovement.findMany({
      where: {
      },
      include: {
        product: {
          select: {
            nome: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    const solicitacoesPendentes = await prisma.solicitacao.count({
      where: {
        status: "pendente",
      },
    });

    const produtosEstoqueBaixo = produtos.filter(
      (produto) => produto.estoqueAtual <= produto.estoqueMinimo
    );

    const totalProdutos = produtos.length;
    const totalItensEstoque = produtos.reduce(
      (total, produto) => total + produto.estoqueAtual,
      0
    );
    const totalEstoqueBaixo = produtosEstoqueBaixo.length;

    const graficoMap = new Map<
      string,
      { data: string; entrada: number; saida: number }
    >();

    movimentacoes
      .slice()
      .reverse()
      .forEach((mov) => {
        const data = new Date(mov.createdAt).toLocaleDateString("pt-BR");

        if (!graficoMap.has(data)) {
          graficoMap.set(data, {
            data,
            entrada: 0,
            saida: 0,
          });
        }

        const item = graficoMap.get(data)!;

        if (mov.tipo === "entrada") {
          item.entrada += mov.quantidade;
        } else {
          item.saida += mov.quantidade;
        }
      });

    return NextResponse.json({
      totalProdutos,
      totalItensEstoque,
      totalEstoqueBaixo,
      solicitacoesPendentes,
      produtosEstoqueBaixo: produtosEstoqueBaixo.slice(0, 10),
      ultimasMovimentacoes: movimentacoes,
      graficoMovimentacoes: Array.from(graficoMap.values()),
    });
  } catch (error) {
    console.error("Erro ao carregar dashboard:", error);

    return NextResponse.json(
      { error: "Erro ao carregar dashboard" },
      { status: 500 }
    );
  }
}