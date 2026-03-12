import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";
import { registrarAuditoria } from "@/lib/audit";

export const dynamic = "force-dynamic";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(_req: Request, context: Context) {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    if (usuario.role !== "admin") {
      return NextResponse.json(
        { error: "Apenas administradores podem cancelar convites" },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    const convite = await prisma.userInvite.findFirst({
      where: {
        id,
        empresaId: usuario.empresaId,
      },
      select: {
        id: true,
        email: true,
        status: true,
      },
    });

    if (!convite) {
      return NextResponse.json(
        { error: "Convite não encontrado" },
        { status: 404 }
      );
    }

    if (convite.status !== "pendente") {
      return NextResponse.json(
        { error: "Só é possível cancelar convites pendentes" },
        { status: 400 }
      );
    }

    const atualizado = await prisma.userInvite.update({
      where: {
        id: convite.id,
      },
      data: {
        status: "cancelado",
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        token: true,
        status: true,
        expiresAt: true,
        createdAt: true,
      },
    });

    await registrarAuditoria({
      empresaId: usuario.empresaId,
      userId: usuario.id,
      acao: "cancelar",
      entidade: "convite",
      entidadeId: atualizado.id,
      descricao: `Convite cancelado para ${atualizado.email}`,
    });

    return NextResponse.json(atualizado);
  } catch (error) {
    console.error("Erro ao cancelar convite:", error);

    return NextResponse.json(
      { error: "Erro ao cancelar convite" },
      { status: 500 }
    );
  }
}