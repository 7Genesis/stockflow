import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function adicionarDias(data: Date, dias: number) {
  const novaData = new Date(data);
  novaData.setDate(novaData.getDate() + dias);
  return novaData;
}

export async function POST() {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    if (usuario.role !== "superadmin") {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const agora = new Date();

    const assinaturas = await prisma.assinatura.findMany({
      where: {
        dataVencimento: {
          not: null,
        },
      },
      select: {
        id: true,
        status: true,
        dataVencimento: true,
      },
    });

    let atrasadas = 0;
    let suspensas = 0;

    for (const assinatura of assinaturas) {
      if (!assinatura.dataVencimento) continue;

      const vencimento = new Date(assinatura.dataVencimento);
      const limiteSuspensao = adicionarDias(vencimento, 3);

      if (
        (assinatura.status === "teste" || assinatura.status === "ativa") &&
        vencimento < agora
      ) {
        await prisma.assinatura.update({
          where: { id: assinatura.id },
          data: { status: "atrasada" },
        });

        atrasadas += 1;
        continue;
      }

      if (assinatura.status === "atrasada" && limiteSuspensao < agora) {
        await prisma.assinatura.update({
          where: { id: assinatura.id },
          data: { status: "suspensa" },
        });

        suspensas += 1;
      }
    }

    return NextResponse.json({
      success: true,
      atrasadas,
      suspensas,
    });
  } catch (error) {
    console.error("Erro ao verificar vencimentos:", error);

    return NextResponse.json(
      { error: "Erro ao verificar vencimentos" },
      { status: 500 }
    );
  }
}