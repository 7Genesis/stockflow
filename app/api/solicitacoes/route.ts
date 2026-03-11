import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type SolicitacaoBody = {
  productId?: string;
  quantidade?: string | number;
};

export async function GET() {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const solicitacoes = await prisma.solicitacao.findMany({
      where: {
      },
      include: {
        user: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
        product: {
          select: {
            id: true,
            nome: true,
            sku: true,
            codigoBarras: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(solicitacoes);
  } catch (error) {
    console.error("Erro ao buscar solicitações:", error);

    return NextResponse.json(
      { error: "Erro ao buscar solicitações" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = (await req.json()) as SolicitacaoBody;

    const productId = String(body.productId ?? "").trim();
    const quantidade = Number(body.quantidade ?? 0);

    if (!productId || !quantidade) {
      return NextResponse.json(
        { error: "Produto e quantidade são obrigatórios" },
        { status: 400 }
      );
    }

    const produto = await prisma.product.findFirst({
      where: {
        id: productId,
      },
      select: {
        id: true,
      },
    });

    if (!produto) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    const solicitacao = await prisma.solicitacao.create({
      data: {
        userId: usuario.id,
        productId,
        quantidade,
        status: "pendente",
      },
      include: {
        product: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    return NextResponse.json(solicitacao, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar solicitação:", error);

    return NextResponse.json(
      { error: "Erro ao criar solicitação" },
      { status: 500 }
    );
  }
}