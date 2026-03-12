import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { registrarAuditoria } from "@/lib/audit";

export const dynamic = "force-dynamic";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(_req: Request, { params }: Params) {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    if (usuario.role !== "admin") {
      return NextResponse.json(
        { error: "Apenas administradores podem reenviar convites" },
        { status: 403 }
      );
    }

    const { id } = await params;

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

    if (convite.status === "aceito") {
      return NextResponse.json(
        { error: "Não é possível reenviar um convite já aceito" },
        { status: 400 }
      );
    }

    const token = crypto.randomBytes(24).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    const atualizado = await prisma.userInvite.update({
      where: { id: convite.id },
      data: {
        token,
        status: "pendente",
        expiresAt,
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
      acao: "editar",
      entidade: "convite",
      entidadeId: atualizado.id,
      descricao: `Convite reenviado para ${atualizado.email}`,
    });

    return NextResponse.json(atualizado);
  } catch (error) {
    console.error("Erro ao reenviar convite:", error);

    return NextResponse.json(
      { error: "Erro ao reenviar convite" },
      { status: 500 }
    );
  }
}