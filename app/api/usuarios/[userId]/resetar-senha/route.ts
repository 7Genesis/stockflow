import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const usuarioLogado = await getSessionUser();

    if (!usuarioLogado) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    if (usuarioLogado.role !== "admin") {
      return NextResponse.json(
        { error: "Apenas administradores podem resetar senha" },
        { status: 403 }
      );
    }

    const { userId } = await params;
    const body = (await req.json()) as { novaSenha?: string };

    const novaSenha = String(body.novaSenha ?? "").trim();

    if (!novaSenha || novaSenha.length < 6) {
      return NextResponse.json(
        { error: "A nova senha deve ter pelo menos 6 caracteres." },
        { status: 400 }
      );
    }

    const usuario = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        empresaId: true,
      },
    });

    if (!usuario || usuario.empresaId !== usuarioLogado.empresaId) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const senhaHash = await bcrypt.hash(novaSenha, 10);

    await prisma.user.update({
      where: { id: userId },
      data: {
        senha: senhaHash,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao resetar senha:", error);

    return NextResponse.json(
      { error: "Erro ao resetar senha" },
      { status: 500 }
    );
  }
}