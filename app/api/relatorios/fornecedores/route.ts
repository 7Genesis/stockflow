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

    const fornecedores = await prisma.fornecedor.findMany({
      include: {
        notasFiscais: {
          select: {
            id: true,
            numeroNota: true,
            valorTotal: true,
            dataEmissao: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        nome: "asc",
      },
    });

    const relatorio = fornecedores.map((fornecedor) => {
      const totalNotas = fornecedor.notasFiscais.length;

      const valorTotalComprado = fornecedor.notasFiscais.reduce(
        (acc, nota) => acc + (nota.valorTotal ?? 0),
        0
      );

      const valorMedioPorNota =
        totalNotas > 0 ? valorTotalComprado / totalNotas : 0;

      const ultimaCompra =
        fornecedor.notasFiscais.length > 0
          ? fornecedor.notasFiscais[0].dataEmissao ??
            fornecedor.notasFiscais[0].createdAt
          : null;

      return {
        id: fornecedor.id,
        nome: fornecedor.nome,
        cnpj: fornecedor.cnpj,
        totalNotas,
        valorTotalComprado,
        valorMedioPorNota,
        ultimaCompra,
      };
    });

    const ranking = [...relatorio].sort(
      (a, b) => b.valorTotalComprado - a.valorTotalComprado
    );

    return NextResponse.json({
      totalFornecedores: relatorio.length,
      valorGlobalComprado: relatorio.reduce(
        (acc, item) => acc + item.valorTotalComprado,
        0
      ),
      fornecedores: relatorio,
      ranking,
    });
  } catch (error) {
    console.error("Erro ao gerar relatório de fornecedores:", error);

    return NextResponse.json(
      { error: "Erro ao gerar relatório de fornecedores" },
      { status: 500 }
    );
  }
}