import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(
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
        { error: "Apenas administradores podem editar usuários" },
        { status: 403 }
      );
    }

    const { userId } = await params;
    const body = (await req.json()) as {
      nome?: string;
      email?: string;
      role?: string;
    };

    const nome = String(body.nome ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const role = String(body.role ?? "user").trim();

    if (!nome || !email) {
      return NextResponse.json(
        { error: "Nome e email são obrigatórios" },
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

    const usuarioComMesmoEmail = await prisma.user.findFirst({
      where: {
        empresaId: usuarioLogado.empresaId,
        email,
        NOT: {
          id: userId,
        },
      },
      select: {
        id: true,
      },
    });

    if (usuarioComMesmoEmail) {
      return NextResponse.json(
        { error: "Já existe um usuário com esse email nesta empresa" },
        { status: 400 }
      );
    }

    const usuarioAtualizado = await prisma.user.update({
      where: { id: userId },
      data: {
        nome,
        email,
        role,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(usuarioAtualizado);
  } catch (error) {
    console.error("Erro ao editar usuário:", error);

    return NextResponse.json(
      { error: "Erro ao editar usuário" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const usuarioLogado = await getSessionUser();

    if (!usuarioLogado) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    if (usuarioLogado.role !== "admin") {
      return NextResponse.json(
        { error: "Apenas administradores podem remover usuários" },
        { status: 403 }
      );
    }

    const { userId } = await params;

    if (usuarioLogado.id === userId) {
      return NextResponse.json(
        { error: "Você não pode remover seu próprio usuário." },
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

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao remover usuário:", error);

    return NextResponse.json(
      { error: "Erro ao remover usuário" },
      { status: 500 }
    );
  }
}