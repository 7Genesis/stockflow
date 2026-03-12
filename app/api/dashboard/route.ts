import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type GraficoItem = {
  data: string;
  entrada: number;
  saida: number;
};

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
      orderBy: {
        nome: "asc",
      },
    });

    const movimentacoes = await prisma.stockMovement.findMany({
      where: {
        empresaId: usuario.empresaId,
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
      take: 20,
    });

    const movimentacoesGrafico = await prisma.stockMovement.findMany({
      where: {
        empresaId: usuario.empresaId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const solicitacoesPendentes = await prisma.solicitacao.count({
      where: {
        empresaId: usuario.empresaId,
        status: "pendente",
      },
    });

    const produtosEstoqueBaixo = produtos
      .filter((produto) => produto.estoqueAtual <= produto.estoqueMinimo)
      .sort((a, b) => {
        const percentualA =
          a.estoqueMinimo > 0 ? a.estoqueAtual / a.estoqueMinimo : 0;
        const percentualB =
          b.estoqueMinimo > 0 ? b.estoqueAtual / b.estoqueMinimo : 0;

        return percentualA - percentualB;
      });

    const totalProdutos = produtos.length;

    const totalItensEstoque = produtos.reduce(
      (total, produto) => total + produto.estoqueAtual,
      0
    );

    const totalEstoqueBaixo = produtosEstoqueBaixo.length;

    const valorTotalEstoque = produtos.reduce((total, produto) => {
      const preco = produto.preco ?? 0;
      return total + preco * produto.estoqueAtual;
    }, 0);

    const totalEntradas = movimentacoesGrafico
      .filter((mov) => mov.tipo === "entrada")
      .reduce((total, mov) => total + mov.quantidade, 0);

    const totalSaidas = movimentacoesGrafico
      .filter((mov) => mov.tipo === "saida")
      .reduce((total, mov) => total + mov.quantidade, 0);

    const saldoMovimentacoes = totalEntradas - totalSaidas;

    const graficoMap = new Map<string, GraficoItem>();

    movimentacoesGrafico.forEach((movimentacao) => {
      const data = new Date(movimentacao.createdAt).toLocaleDateString("pt-BR");

      if (!graficoMap.has(data)) {
        graficoMap.set(data, {
          data,
          entrada: 0,
          saida: 0,
        });
      }

      const item = graficoMap.get(data)!;

      if (movimentacao.tipo === "entrada") {
        item.entrada += movimentacao.quantidade;
      } else {
        item.saida += movimentacao.quantidade;
      }
    });

    return NextResponse.json({
      totalProdutos,
      totalItensEstoque,
      totalEstoqueBaixo,
      solicitacoesPendentes,
      valorTotalEstoque,
      totalEntradas,
      totalSaidas,
      saldoMovimentacoes,
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