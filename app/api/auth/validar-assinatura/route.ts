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

    if (usuario.role === "superadmin") {
      return NextResponse.json({ success: true });
    }

    const assinatura = await prisma.assinatura.findUnique({
      where: {
        empresaId: usuario.empresaId,
      },
      select: {
        id: true,
        status: true,
        plano: true,
        dataVencimento: true,
      },
    });

    if (!assinatura) {
      return NextResponse.json(
        { error: "Assinatura não encontrada" },
        { status: 403 }
      );
    }

    if (assinatura.status === "pendente") {
      return NextResponse.json(
        { error: "Empresa pendente de liberação" },
        { status: 403 }
      );
    }

    if (assinatura.status === "suspensa") {
      return NextResponse.json(
        { error: "Empresa suspensa" },
        { status: 403 }
      );
    }

    if (assinatura.status === "cancelada") {
      return NextResponse.json(
        { error: "Empresa cancelada" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      assinatura: {
        id: assinatura.id,
        status: assinatura.status,
        plano: assinatura.plano,
        dataVencimento: assinatura.dataVencimento,
      },
    });
  } catch (error) {
    console.error("Erro ao validar assinatura:", error);

    return NextResponse.json(
      { error: "Erro ao validar assinatura" },
      { status: 500 }
    );
  }
}