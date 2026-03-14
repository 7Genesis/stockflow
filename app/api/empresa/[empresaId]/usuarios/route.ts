import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ empresaId: string }> }
) {
  try {
    const usuarioLogado = await getSessionUser();

    if (!usuarioLogado) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    if (usuarioLogado.role !== "superadmin") {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const { empresaId } = await params;

    const usuarios = await prisma.user.findMany({
      where: {
        empresaId,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(usuarios);
  } catch (error) {
    console.error("Erro ao listar usuários da empresa:", error);

    return NextResponse.json(
      { error: "Erro ao listar usuários da empresa." },
      { status: 500 }
    );
  }
}