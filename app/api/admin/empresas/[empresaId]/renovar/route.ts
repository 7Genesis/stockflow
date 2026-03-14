import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";
import { adicionarDias, diasPlano, valorPlano } from "@/lib/saas-plans";

export const dynamic = "force-dynamic";

type Body = {
  plano?: "free" | "pro" | "enterprise";
};

export async function POST(
  req: Request,
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
    const body = (await req.json()) as Body;

    const plano = body.plano ?? "free";
    const agora = new Date();

    const assinatura = await prisma.assinatura.findUnique({
      where: { empresaId },
      select: {
        id: true,
        dataVencimento: true,
      },
    });

    if (!assinatura) {
      return NextResponse.json(
        { error: "Assinatura não encontrada para esta empresa" },
        { status: 404 }
      );
    }

    const base =
      assinatura.dataVencimento &&
      new Date(assinatura.dataVencimento).getTime() > agora.getTime()
        ? new Date(assinatura.dataVencimento)
        : agora;

    const novoVencimento = adicionarDias(base, diasPlano(plano));

    await prisma.$transaction(async (tx) => {
      await tx.assinatura.update({
        where: { empresaId },
        data: {
          status: "ativa",
          plano,
          dataVencimento: novoVencimento,
          dataCancelamento: null,
        },
      });

      await tx.pagamentoSaas.create({
        data: {
          empresaId,
          tipo: "renovacao",
          plano,
          valor: valorPlano(plano),
          status: "confirmado",
          descricao: `Renovação da assinatura no plano ${plano}`,
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Assinatura renovada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao renovar assinatura:", error);

    return NextResponse.json(
      { error: "Erro ao renovar assinatura" },
      { status: 500 }
    );
  }
}