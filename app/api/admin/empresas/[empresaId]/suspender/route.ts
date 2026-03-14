import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ empresaId: string }> }
) {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    if (usuario.role !== "superadmin") {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const { empresaId } = await params;

    const assinatura = await prisma.assinatura.findUnique({
      where: { empresaId },
      select: {
        id: true,
        plano: true,
      },
    });

    if (!assinatura) {
      return NextResponse.json(
        { error: "Assinatura não encontrada" },
        { status: 404 }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.assinatura.update({
        where: { empresaId },
        data: {
          status: "suspensa",
        },
      });

      await tx.pagamentoSaas.create({
        data: {
          empresaId,
          tipo: "suspensao",
          plano: assinatura.plano,
          valor: 0,
          status: "confirmado",
          descricao: "Empresa suspensa manualmente pelo superadmin",
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Empresa suspensa com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao suspender empresa:", error);

    return NextResponse.json(
      { error: "Erro ao suspender empresa" },
      { status: 500 }
    );
  }
}