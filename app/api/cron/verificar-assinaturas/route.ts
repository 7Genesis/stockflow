import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const hoje = new Date();

    const assinaturas = await prisma.assinatura.findMany();

    for (const assinatura of assinaturas) {
      if (!assinatura.dataVencimento) continue;

      const vencimento = new Date(assinatura.dataVencimento);

      if (vencimento < hoje && assinatura.status === "ativa") {
        await prisma.assinatura.update({
          where: { id: assinatura.id },
          data: { status: "atrasada" },
        });
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro no cron" },
      { status: 500 }
    );
  }
}