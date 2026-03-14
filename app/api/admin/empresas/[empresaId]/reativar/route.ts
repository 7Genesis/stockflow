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
    const vencimento = adicionarDias(agora, diasPlano(plano));

    const assinatura = await prisma.assinatura.findUnique({
      where: { empresaId },
      select: {
        id: true,
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
          status: "ativa",
          plano,
          dataInicio: agora,
          dataVencimento: vencimento,
          dataCancelamento: null,
        },
      });

      await tx.pagamentoSaas.create({
        data: {
          empresaId,
          tipo: "reativacao",
          plano,
          valor: valorPlano(plano),
          status: "confirmado",
          descricao: `Empresa reativada no plano ${plano}`,
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Empresa reativada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao reativar empresa:", error);

    return NextResponse.json(
      { error: "Erro ao reativar empresa" },
      { status: 500 }
    );
  }
}