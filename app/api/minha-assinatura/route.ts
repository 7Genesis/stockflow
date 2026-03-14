import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const empresa = await prisma.empresa.findUnique({
      where: {
        id: usuario.empresaId,
      },
      select: {
        id: true,
        nome: true,
        tipoDocumento: true,
        documento: true,
        createdAt: true,
        assinatura: {
          select: {
            id: true,
            status: true,
            plano: true,
            dataInicio: true,
            dataVencimento: true,
            dataCancelamento: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        _count: {
          select: {
            usuarios: true,
            produtos: true,
          },
        },
      },
    });

    if (!empresa) {
      return NextResponse.json(
        { error: "Empresa não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      empresa: {
        id: empresa.id,
        nome: empresa.nome,
        tipoDocumento: empresa.tipoDocumento,
        documento: empresa.documento,
        createdAt: empresa.createdAt,
      },
      assinatura: empresa.assinatura,
      totais: {
        usuarios: empresa._count.usuarios,
        produtos: empresa._count.produtos,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar minha assinatura:", error);

    return NextResponse.json(
      { error: "Erro ao buscar assinatura" },
      { status: 500 }
    );
  }
}