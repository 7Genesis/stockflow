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

    const empresa = await prisma.empresa.findUnique({
      where: { id: empresaId },
      select: {
        id: true,
        nome: true,
        assinatura: {
          select: {
            id: true,
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

    await prisma.$transaction(async (tx) => {
      if (empresa.assinatura) {
        await tx.assinatura.update({
          where: {
            empresaId,
          },
          data: {
            status: "ativa",
            plano,
            dataInicio: agora,
            dataVencimento: vencimento,
            dataCancelamento: null,
          },
        });
      } else {
        await tx.assinatura.create({
          data: {
            empresaId,
            status: "ativa",
            plano,
            dataInicio: agora,
            dataVencimento: vencimento,
          },
        });
      }

      await tx.pagamentoSaas.create({
        data: {
          empresaId,
          tipo: "liberacao",
          plano,
          valor: valorPlano(plano),
          status: "confirmado",
          descricao: `Liberação inicial da empresa no plano ${plano}`,
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Empresa liberada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao liberar empresa:", error);

    return NextResponse.json(
      { error: "Erro ao liberar empresa" },
      { status: 500 }
    );
  }
}