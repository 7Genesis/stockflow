import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ empresaId: string }> }
) {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    if (usuario.role !== "superadmin") {
      return NextResponse.json(
        { error: "Acesso permitido apenas para superadmin" },
        { status: 403 }
      );
    }

    const { empresaId } = await params;

    const empresa = await prisma.empresa.findUnique({
      where: {
        id: empresaId,
      },
      select: {
        id: true,
      },
    });

    if (!empresa) {
      return NextResponse.json(
        { error: "Empresa não encontrada" },
        { status: 404 }
      );
    }

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
        createdAt: "desc",
      },
    });

    return NextResponse.json(usuarios);
  } catch (error) {
    console.error("Erro ao listar usuários da empresa:", error);

    return NextResponse.json(
      { error: "Erro ao listar usuários" },
      { status: 500 }
    );
  }
}