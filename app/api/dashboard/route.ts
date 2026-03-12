import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function formatarMesAno(data: Date) {
  return data.toLocaleDateString("pt-BR", {
    month: "2-digit",
    year: "numeric",
  });
}

export async function GET() {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const [
      produtos,
      movimentacoes,
      solicitacoesPendentes,
      totalProdutos,
    ] = await Promise.all([
      prisma.product.findMany({
        where: {
          empresaId: usuario.empresaId,
        },
        select: {
          id: true,
          nome: true,
          preco: true,
          estoqueAtual: true,
          estoqueMinimo: true,
          createdAt: true,
        },
      }),
      prisma.stockMovement.findMany({
        where: {
          empresaId: usuario.empresaId,
        },
        include: {
          product: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.solicitacao.count({
        where: {
          empresaId: usuario.empresaId,
          status: "pendente",
        },
      }),
      prisma.product.count({
        where: {
          empresaId: usuario.empresaId,
        },
      }),
    ]);

    const totalItensEstoque = produtos.reduce(
      (acc, produto) => acc + produto.estoqueAtual,
      0
    );

    const totalEstoqueBaixo = produtos.filter(
      (produto) => produto.estoqueAtual <= produto.estoqueMinimo
    ).length;

    const valorTotalEstoque = produtos.reduce((acc, produto) => {
      return acc + (produto.preco ?? 0) * produto.estoqueAtual;
    }, 0);

    const totalEntradas = movimentacoes
      .filter((mov) => mov.tipo === "entrada")
      .reduce((acc, mov) => acc + mov.quantidade, 0);

    const totalSaidas = movimentacoes
      .filter((mov) => mov.tipo === "saida")
      .reduce((acc, mov) => acc + mov.quantidade, 0);

    const saldoMovimentacoes = totalEntradas - totalSaidas;

    const produtosEstoqueBaixo = produtos
      .filter((produto) => produto.estoqueAtual <= produto.estoqueMinimo)
      .sort((a, b) => a.estoqueAtual - b.estoqueAtual)
      .slice(0, 10)
      .map((produto) => ({
        id: produto.id,
        nome: produto.nome,
        estoqueAtual: produto.estoqueAtual,
        estoqueMinimo: produto.estoqueMinimo,
      }));

    const ultimasMovimentacoes = movimentacoes.slice(0, 8).map((mov) => ({
      id: mov.id,
      tipo: mov.tipo,
      quantidade: mov.quantidade,
      createdAt: mov.createdAt,
      product: {
        nome: mov.product.nome,
      },
    }));

    const graficoMap = new Map<
      string,
      { data: string; entrada: number; saida: number }
    >();

    for (const mov of movimentacoes) {
      const chave = formatarMesAno(new Date(mov.createdAt));

      const atual = graficoMap.get(chave) ?? {
        data: chave,
        entrada: 0,
        saida: 0,
      };

      if (mov.tipo === "entrada") {
        atual.entrada += mov.quantidade;
      } else {
        atual.saida += mov.quantidade;
      }

      graficoMap.set(chave, atual);
    }

    const graficoMovimentacoes = Array.from(graficoMap.values()).reverse();

    const porProdutoMap = new Map<
      string,
      { productId: string; nome: string; total: number }
    >();

    for (const mov of movimentacoes) {
      const atual = porProdutoMap.get(mov.product.id) ?? {
        productId: mov.product.id,
        nome: mov.product.nome,
        total: 0,
      };

      atual.total += mov.quantidade;
      porProdutoMap.set(mov.product.id, atual);
    }

    const produtosMaisMovimentados = Array.from(porProdutoMap.values())
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    const produtosParados = produtos
      .filter((produto) => {
        return !movimentacoes.some((mov) => mov.productId === produto.id);
      })
      .slice(0, 5)
      .map((produto) => ({
        id: produto.id,
        nome: produto.nome,
        estoqueAtual: produto.estoqueAtual,
      }));

    const consumoMensalMap = new Map<
      string,
      { mes: string; totalSaidas: number }
    >();

    for (const mov of movimentacoes) {
      const mes = formatarMesAno(new Date(mov.createdAt));
      const atual = consumoMensalMap.get(mes) ?? {
        mes,
        totalSaidas: 0,
      };

      if (mov.tipo === "saida") {
        atual.totalSaidas += mov.quantidade;
      }

      consumoMensalMap.set(mes, atual);
    }

    const consumoMensal = Array.from(consumoMensalMap.values()).reverse();

    return NextResponse.json({
      totalProdutos,
      totalItensEstoque,
      totalEstoqueBaixo,
      solicitacoesPendentes,
      valorTotalEstoque,
      totalEntradas,
      totalSaidas,
      saldoMovimentacoes,
      produtosEstoqueBaixo,
      ultimasMovimentacoes,
      graficoMovimentacoes,
      produtosMaisMovimentados,
      produtosParados,
      consumoMensal,
    });
  } catch (error) {
    console.error("Erro ao carregar dashboard:", error);

    return NextResponse.json(
      { error: "Erro ao carregar dashboard" },
      { status: 500 }
    );
  }
}