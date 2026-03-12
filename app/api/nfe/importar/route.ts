import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export const dynamic = "force-dynamic";

type ParsedNfeItem = {
  codigo: string | null;
  codigoBarras: string | null;
  descricao: string;
  quantidade: number;
  valorUnitario: number | null;
  ncm: string | null;
  cfop: string | null;
  unidade: string | null;
};

type ParsedNfe = {
  chaveAcesso: string;
  numeroNota: string | null;
  serie: string | null;
  fornecedor: string | null;
  cnpjFornecedor: string | null;
  dataEmissao: Date | null;
  valorTotal: number | null;
  itens: ParsedNfeItem[];
};

function onlyDigits(value: string | undefined | null) {
  return String(value ?? "").replace(/\D/g, "");
}

function normalizeBarcode(value: unknown): string | null {
  const raw = String(value ?? "").trim();
  if (!raw) return null;

  const upper = raw.toUpperCase();
  if (
    upper === "SEM GTIN" ||
    upper === "SEM GTIN13" ||
    upper === "SEM GTIN14"
  ) {
    return null;
  }

  return raw;
}

function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || String(value).trim() === "") {
    return null;
  }

  const parsed = Number(String(value).replace(",", "."));
  return Number.isNaN(parsed) ? null : parsed;
}

function toDate(value: unknown): Date | null {
  const raw = String(value ?? "").trim();
  if (!raw) return null;

  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function asArray<T>(value: T | T[] | undefined | null): T[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function findInfNfe(parsed: any) {
  return (
    parsed?.nfeProc?.NFe?.infNFe ??
    parsed?.NFe?.infNFe ??
    parsed?.procNFe?.NFe?.infNFe ??
    null
  );
}

function extractAccessKey(parsed: any, infNFe: any): string | null {
  const fromProt =
    parsed?.nfeProc?.protNFe?.infProt?.chNFe ??
    parsed?.protNFe?.infProt?.chNFe ??
    null;

  if (fromProt) return String(fromProt);

  const attrId = String(infNFe?.["@_Id"] ?? "").trim();
  if (attrId.startsWith("NFe")) {
    return attrId.replace(/^NFe/, "");
  }

  return null;
}

function parseNfeXml(xml: string): ParsedNfe {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    trimValues: true,
    parseTagValue: false,
  });

  const parsed = parser.parse(xml);
  const infNFe = findInfNfe(parsed);

  if (!infNFe) {
    throw new Error("XML da NF-e inválido ou estrutura não reconhecida.");
  }

  const chaveAcesso = extractAccessKey(parsed, infNFe);
  if (!chaveAcesso) {
    throw new Error("Não foi possível identificar a chave de acesso da NF-e.");
  }

  const ide = infNFe?.ide ?? {};
  const emit = infNFe?.emit ?? {};
  const total = infNFe?.total?.ICMSTot ?? {};
  const itensRaw = asArray(infNFe?.det);

  const itens: ParsedNfeItem[] = itensRaw.map((det: any) => {
    const prod = det?.prod ?? {};

    const descricao = String(prod?.xProd ?? "").trim();
    const quantidade = toNumber(prod?.qCom);
    const valorUnitario = toNumber(prod?.vUnCom);

    if (!descricao) {
      throw new Error("Existe item na NF-e sem descrição.");
    }

    if (!quantidade || quantidade <= 0) {
      throw new Error(`Quantidade inválida no item "${descricao}".`);
    }

    return {
      codigo: String(prod?.cProd ?? "").trim() || null,
      codigoBarras:
        normalizeBarcode(prod?.cEAN) ??
        normalizeBarcode(prod?.cEANTrib),
      descricao,
      quantidade,
      valorUnitario,
      ncm: String(prod?.NCM ?? "").trim() || null,
      cfop: String(prod?.CFOP ?? "").trim() || null,
      unidade: String(prod?.uCom ?? "").trim() || null,
    };
  });

  return {
    chaveAcesso,
    numeroNota: String(ide?.nNF ?? "").trim() || null,
    serie: String(ide?.serie ?? "").trim() || null,
    fornecedor: String(emit?.xNome ?? "").trim() || null,
    cnpjFornecedor: onlyDigits(emit?.CNPJ) || null,
    dataEmissao: toDate(ide?.dhEmi ?? ide?.dEmi),
    valorTotal: toNumber(total?.vNF),
    itens,
  };
}

function sanitizeSku(value: string | null): string | null {
  if (!value) return null;

  const sanitized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\\-_/]/g, "")
    .trim()
    .toUpperCase();

  return sanitized || null;
}

export async function POST(req: Request) {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Envie um arquivo XML da NF-e." },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith(".xml")) {
      return NextResponse.json(
        { error: "O arquivo enviado precisa ser um XML." },
        { status: 400 }
      );
    }

    const xml = await file.text();

    if (!xml.trim()) {
      return NextResponse.json(
        { error: "O arquivo XML está vazio." },
        { status: 400 }
      );
    }

    const parsedNfe = parseNfeXml(xml);

    const jaImportada = await prisma.nfeImport.findFirst({
      where: {
        empresaId: usuario.empresaId,
        chaveAcesso: parsedNfe.chaveAcesso,
      },
      select: {
        id: true,
      },
    });

    if (jaImportada) {
      return NextResponse.json(
        { error: "Esta NF-e já foi importada anteriormente." },
        { status: 400 }
      );
    }

    const resultado = await prisma.$transaction(async (tx) => {
      let fornecedorId: string | null = null;

      if (parsedNfe.cnpjFornecedor && parsedNfe.fornecedor) {
        const fornecedorExistente = await tx.fornecedor.findFirst({
          where: {
            empresaId: usuario.empresaId,
            cnpj: parsedNfe.cnpjFornecedor,
          },
          select: {
            id: true,
          },
        });

        if (fornecedorExistente) {
          fornecedorId = fornecedorExistente.id;
        } else {
          const novoFornecedor = await tx.fornecedor.create({
            data: {
              empresaId: usuario.empresaId,
              nome: parsedNfe.fornecedor,
              cnpj: parsedNfe.cnpjFornecedor,
            },
            select: {
              id: true,
            },
          });

          fornecedorId = novoFornecedor.id;
        }
      }

      const nfe = await tx.nfeImport.create({
        data: {
          empresaId: usuario.empresaId,
          chaveAcesso: parsedNfe.chaveAcesso,
          numeroNota: parsedNfe.numeroNota,
          serie: parsedNfe.serie,
          fornecedor: parsedNfe.fornecedor,
          cnpjFornecedor: parsedNfe.cnpjFornecedor,
          fornecedorId,
          dataEmissao: parsedNfe.dataEmissao,
          valorTotal: parsedNfe.valorTotal,
          xmlOriginal: xml,
        },
      });

      let produtosCriados = 0;
      let produtosAtualizados = 0;

      for (const item of parsedNfe.itens) {
        const quantidadeMovimentacao = item.quantidade;

        let produto =
          (item.codigoBarras
            ? await tx.product.findFirst({
                where: {
                  empresaId: usuario.empresaId,
                  codigoBarras: item.codigoBarras,
                },
              })
            : null) ??
          (sanitizeSku(item.codigo)
            ? await tx.product.findFirst({
                where: {
                  empresaId: usuario.empresaId,
                  sku: sanitizeSku(item.codigo)!,
                },
              })
            : null) ??
          (await tx.product.findFirst({
            where: {
              empresaId: usuario.empresaId,
              nome: item.descricao,
            },
          }));

        if (!produto) {
          produto = await tx.product.create({
            data: {
              empresaId: usuario.empresaId,
              nome: item.descricao,
              sku: sanitizeSku(item.codigo),
              codigoBarras: item.codigoBarras,
              categoria: null,
              custo: item.valorUnitario,
              preco: item.valorUnitario,
              estoqueAtual: 0,
              estoqueMinimo: 0,
            },
          });

          produtosCriados += 1;
        } else {
          await tx.product.update({
            where: { id: produto.id },
            data: {
              custo: item.valorUnitario ?? produto.custo,
              preco: item.valorUnitario ?? produto.preco,
              codigoBarras: produto.codigoBarras ?? item.codigoBarras,
              sku: produto.sku ?? sanitizeSku(item.codigo),
            },
          });

          produtosAtualizados += 1;
        }

        await tx.nfeImportItem.create({
          data: {
            nfeImportId: nfe.id,
            productId: produto.id,
            codigo: item.codigo,
            codigoBarras: item.codigoBarras,
            descricao: item.descricao,
            quantidade: item.quantidade,
            valorUnitario: item.valorUnitario,
            ncm: item.ncm,
            cfop: item.cfop,
            unidade: item.unidade,
          },
        });

        await tx.stockMovement.create({
          data: {
            empresaId: usuario.empresaId,
            productId: produto.id,
            tipo: "entrada",
            quantidade: quantidadeMovimentacao,
            observacao: `Entrada por NF-e ${parsedNfe.numeroNota ?? "-"} - ${
              parsedNfe.fornecedor ?? "Fornecedor não informado"
            }`,
          },
        });

        await tx.product.update({
          where: { id: produto.id },
          data: {
            estoqueAtual: {
              increment: quantidadeMovimentacao,
            },
          },
        });
      }

      return {
        nfeId: nfe.id,
        fornecedorId,
        produtosCriados,
        produtosAtualizados,
        totalItens: parsedNfe.itens.length,
      };
    });

    return NextResponse.json({
      success: true,
      message: "NF-e importada com sucesso.",
      nfe: {
        chaveAcesso: parsedNfe.chaveAcesso,
        numeroNota: parsedNfe.numeroNota,
        fornecedor: parsedNfe.fornecedor,
        cnpjFornecedor: parsedNfe.cnpjFornecedor,
        dataEmissao: parsedNfe.dataEmissao,
        valorTotal: parsedNfe.valorTotal,
      },
      resumo: resultado,
    });
  } catch (error) {
    console.error("Erro ao importar NF-e:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao importar NF-e.",
      },
      { status: 500 }
    );
  }
}