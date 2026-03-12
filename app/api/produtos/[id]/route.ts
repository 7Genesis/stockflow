import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

type ProdutoBody = {
  nome?: string;
  categoria?: string | null;
  sku?: string | null;
  codigoBarras?: string | null;
  preco?: string | number | null;
  estoqueMinimo?: string | number | null;
};

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { id } = await params;
    const body = (await request.json()) as ProdutoBody;

    const nome = String(body.nome ?? "").trim();

    if (!nome) {
      return NextResponse.json(
        { error: "Nome do produto é obrigatório" },
        { status: 400 }
      );
    }

    const produtoExistente = await prisma.product.findFirst({
      where: {
        id,
        empresaId: usuario.empresaId,
      },
      select: {
        id: true,
      },
    });

    if (!produtoExistente) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    const sku = body.sku ? String(body.sku).trim() : null;
    const codigoBarras = body.codigoBarras
      ? String(body.codigoBarras).trim()
      : null;

    if (sku) {
      const skuExistente = await prisma.product.findFirst({
        where: {
          empresaId: usuario.empresaId,
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
          empresaId: usuario.empresaId,
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
        sku,
        codigoBarras,
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
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { id } = await params;

    const produtoExistente = await prisma.product.findFirst({
      where: {
        id,
        empresaId: usuario.empresaId,
      },
      select: {
        id: true,
      },
    });

    if (!produtoExistente) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.stockMovement.deleteMany({
        where: {
          empresaId: usuario.empresaId,
          productId: id,
        },
      });

      await tx.solicitacao.deleteMany({
        where: {
          empresaId: usuario.empresaId,
          productId: id,
        },
      });

      await tx.nfeImportItem.deleteMany({
        where: {
          productId: id,
        },
      });

      await tx.product.delete({
        where: {
          id,
        },
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