import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const nome = String(body.nome ?? "").trim();

    if (!nome) {
      return NextResponse.json(
        { error: "Nome do produto é obrigatório" },
        { status: 400 }
      );
    }

    const sku = body.sku ? String(body.sku).trim() : null;
    const codigoBarras = body.codigoBarras
      ? String(body.codigoBarras).trim()
      : null;

    if (sku) {
      const skuExistente = await prisma.product.findFirst({
        where: {
          sku,
          NOT: { id },
        },
        select: { id: true },
      });

      if (skuExistente) {
        return NextResponse.json(
          { error: "Já existe outro produto com esse SKU" },
          { status: 400 }
        );
      }
    }

    if (codigoBarras) {
      const codigoExistente = await prisma.product.findFirst({
        where: {
          codigoBarras,
          NOT: { id },
        },
        select: { id: true },
      });

      if (codigoExistente) {
        return NextResponse.json(
          { error: "Já existe outro produto com esse código de barras" },
          { status: 400 }
        );
      }
    }

    const produto = await prisma.product.update({
      where: { id },
      data: {
        nome,
        categoria: String(body.categoria ?? "").trim() || null,
        preco:
          body.preco !== null &&
          body.preco !== undefined &&
          String(body.preco).trim() !== ""
            ? Number(body.preco)
            : null,
        estoqueMinimo:
          body.estoqueMinimo !== null &&
          body.estoqueMinimo !== undefined &&
          String(body.estoqueMinimo).trim() !== ""
            ? Number(body.estoqueMinimo)
            : 0,
        codigoBarras,
      },
    });

    return NextResponse.json(produto);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);

    return NextResponse.json(
      { error: "Erro ao atualizar produto" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.$transaction(async (tx) => {
      await tx.stockMovement.deleteMany({
        where: { productId: id },
      });

      await tx.solicitacao.deleteMany({
        where: { productId: id },
      });

      await tx.product.delete({
        where: { id },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);

    return NextResponse.json(
      { error: "Erro ao deletar produto" },
      { status: 500 }
    );
  }
}