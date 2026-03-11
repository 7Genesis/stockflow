import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type ProdutoBody = {
  nome?: string;
  categoria?: string;
  sku?: string;
  codigoBarras?: string;
  custo?: string | number | null;
  preco?: string | number | null;
  estoqueAtual?: string | number | null;
  estoqueMinimo?: string | number | null;
};

function normalizarTexto(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "-");
}

function gerarSkuBase(nome: string) {
  return normalizarTexto(nome).slice(0, 12) || "PROD";
}

function gerarSkuAutomatico(nome: string) {
  const base = gerarSkuBase(nome);
  const sufixo = `${Date.now().toString().slice(-6)}${Math.floor(
    Math.random() * 100
  )
    .toString()
    .padStart(2, "0")}`;

  return `${base}-${sufixo}`;
}

function gerarCodigoBarrasAutomatico() {
  const timestamp = Date.now().toString();
  const aleatorio = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  return `${timestamp}${aleatorio}`.slice(0, 13);
}

async function gerarSkuUnico(nome: string) {
  for (let tentativa = 0; tentativa < 10; tentativa++) {
    const sku = gerarSkuAutomatico(nome);

    const existente = await prisma.product.findUnique({
      where: { sku },
      select: { id: true },
    });

    if (!existente) {
      return sku;
    }
  }

  throw new Error("Não foi possível gerar um SKU único");
}

async function gerarCodigoBarrasUnico() {
  for (let tentativa = 0; tentativa < 10; tentativa++) {
    const codigoBarras = gerarCodigoBarrasAutomatico();

    const existente = await prisma.product.findUnique({
      where: { codigoBarras },
      select: { id: true },
    });

    if (!existente) {
      return codigoBarras;
    }
  }

  throw new Error("Não foi possível gerar um código de barras único");
}

export async function GET() {
  try {
    const produtos = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);

    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ProdutoBody;

    const nome = String(body.nome ?? "").trim();
    const categoria = String(body.categoria ?? "").trim() || null;

    if (!nome) {
      return NextResponse.json(
        { error: "Nome do produto é obrigatório" },
        { status: 400 }
      );
    }

    let sku = body.sku ? String(body.sku).trim() : "";
    let codigoBarras = body.codigoBarras
      ? String(body.codigoBarras).trim()
      : "";

    if (sku) {
      const skuExistente = await prisma.product.findUnique({
        where: { sku },
        select: { id: true },
      });

      if (skuExistente) {
        return NextResponse.json(
          { error: "Já existe um produto com esse SKU" },
          { status: 400 }
        );
      }
    } else {
      sku = await gerarSkuUnico(nome);
    }

    if (codigoBarras) {
      const codigoExistente = await prisma.product.findUnique({
        where: { codigoBarras },
        select: { id: true },
      });

      if (codigoExistente) {
        return NextResponse.json(
          { error: "Já existe um produto com esse código de barras" },
          { status: 400 }
        );
      }
    } else {
      codigoBarras = await gerarCodigoBarrasUnico();
    }

    const produto = await prisma.product.create({
      data: {
        nome,
        sku,
        codigoBarras,
        categoria,
        custo:
          body.custo !== null &&
          body.custo !== undefined &&
          String(body.custo).trim() !== ""
            ? Number(body.custo)
            : null,
        preco:
          body.preco !== null &&
          body.preco !== undefined &&
          String(body.preco).trim() !== ""
            ? Number(body.preco)
            : null,
        estoqueAtual:
          body.estoqueAtual !== null &&
          body.estoqueAtual !== undefined &&
          String(body.estoqueAtual).trim() !== ""
            ? Number(body.estoqueAtual)
            : 0,
        estoqueMinimo:
          body.estoqueMinimo !== null &&
          body.estoqueMinimo !== undefined &&
          String(body.estoqueMinimo).trim() !== ""
            ? Number(body.estoqueMinimo)
            : 0,
      },
    });

    return NextResponse.json(produto, { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);

    return NextResponse.json(
      { error: "Erro ao cadastrar produto" },
      { status: 500 }
    );
  }
}