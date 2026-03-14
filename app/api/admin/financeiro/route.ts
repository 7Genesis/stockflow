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
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const empresas = await prisma.empresa.findMany({
      include: {
        assinatura: true,
      },
    });

    const totalEmpresas = empresas.length;

    const status = {
      pendentes: empresas.filter((e) => e.assinatura?.status === "pendente")
        .length,
      ativas: empresas.filter((e) => e.assinatura?.status === "ativa").length,
      atrasadas: empresas.filter((e) => e.assinatura?.status === "atrasada")
        .length,
      suspensas: empresas.filter((e) => e.assinatura?.status === "suspensa")
        .length,
      canceladas: empresas.filter((e) => e.assinatura?.status === "cancelada")
        .length,
      teste: empresas.filter((e) => e.assinatura?.status === "teste").length,
    };

    const planos = {
      free: empresas.filter((e) => e.assinatura?.plano === "free").length,
      pro: empresas.filter((e) => e.assinatura?.plano === "pro").length,
      enterprise: empresas.filter((e) => e.assinatura?.plano === "enterprise")
        .length,
    };

    const receitaMensalEstimada = empresas.reduce((total, empresa) => {
      const plano = empresa.assinatura?.plano;
      const assinaturaStatus = empresa.assinatura?.status;

      if (!assinaturaStatus) return total;
      if (assinaturaStatus === "cancelada") return total;
      if (assinaturaStatus === "pendente") return total;

      if (plano === "pro") return total + 49;
      if (plano === "enterprise") return total + 199;

      return total;
    }, 0);

    return NextResponse.json({
      totalEmpresas,
      receitaMensalEstimada,
      status,
      planos,
    });
  } catch (error) {
    console.error("Erro ao carregar financeiro do SaaS:", error);

    return NextResponse.json(
      { error: "Erro ao carregar financeiro do SaaS" },
      { status: 500 }
    );
  }
}