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

    if (usuario.role !== "superadmin") {
      return NextResponse.json(
        { error: "Acesso permitido apenas para super admin" },
        { status: 403 }
      );
    }

    const empresas = await prisma.empresa.findMany({
      include: {
        assinatura: true,
        usuarios: {
          select: {
            id: true,
          },
        },
        produtos: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const resultado = empresas.map((empresa) => ({
      id: empresa.id,
      nome: empresa.nome,
      tipoDocumento: empresa.tipoDocumento,
      documento: empresa.documento,
      createdAt: empresa.createdAt,
      totalUsuarios: empresa.usuarios.length,
      totalProdutos: empresa.produtos.length,
      assinatura: empresa.assinatura
        ? {
            id: empresa.assinatura.id,
            status: empresa.assinatura.status,
            plano: empresa.assinatura.plano,
            dataInicio: empresa.assinatura.dataInicio,
            dataVencimento: empresa.assinatura.dataVencimento,
            dataCancelamento: empresa.assinatura.dataCancelamento,
          }
        : null,
    }));

    return NextResponse.json(resultado);
  } catch (error) {
    console.error("Erro ao listar empresas do admin:", error);

    return NextResponse.json(
      { error: "Erro ao listar empresas" },
      { status: 500 }
    );
  }
}