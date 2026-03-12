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

    return NextResponse.json({
      success: true,
      preview: {
        chaveAcesso: parsedNfe.chaveAcesso,
        numeroNota: parsedNfe.numeroNota,
        serie: parsedNfe.serie,
        fornecedor: parsedNfe.fornecedor,
        cnpjFornecedor: parsedNfe.cnpjFornecedor,
        dataEmissao: parsedNfe.dataEmissao,
        valorTotal: parsedNfe.valorTotal,
        totalItens: parsedNfe.itens.length,
        itens: parsedNfe.itens,
      },
    });
  } catch (error) {
    console.error("Erro ao pré-visualizar NF-e:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao pré-visualizar NF-e.",
      },
      { status: 500 }
    );
  }
}