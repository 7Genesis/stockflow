import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

type UsuarioBody = {
  nome?: string;
  email?: string;
  role?: string;
  senha?: string;
};

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const usuarioLogado = await getSessionUser();

    if (!usuarioLogado) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    if (usuarioLogado.role !== "admin") {
      return NextResponse.json(
        { error: "Apenas administradores podem atualizar usuários" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = (await request.json()) as UsuarioBody;

    const nome = String(body.nome ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const role = String(body.role ?? "user").trim();
    const senha = String(body.senha ?? "").trim();

    if (!nome || !email) {
      return NextResponse.json(
        { error: "Nome e email são obrigatórios" },
        { status: 400 }
      );
    }

    if (role !== "admin" && role !== "user") {
      return NextResponse.json(
        { error: "Perfil inválido" },
        { status: 400 }
      );
    }

    const usuarioExistente = await prisma.user.findFirst({
      where: {
        id,
        empresaId: usuarioLogado.empresaId,
      },
      select: { id: true },
    });

    if (!usuarioExistente) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const emailEmUso = await prisma.user.findFirst({
      where: {
        empresaId: usuarioLogado.empresaId,
        email,
        NOT: { id },
      },
      select: { id: true },
    });

    if (emailEmUso) {
      return NextResponse.json(
        { error: "Já existe outro usuário com esse email nesta empresa" },
        { status: 400 }
      );
    }

    const data: {
      nome: string;
      email: string;
      role: string;
      senha?: string;
    } = {
      nome,
      email,
      role,
    };

    if (senha) {
      data.senha = await bcrypt.hash(senha, 10);
    }

    const usuario = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(usuario);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);

    return NextResponse.json(
      { error: "Erro ao atualizar usuário" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const usuarioLogado = await getSessionUser();

    if (!usuarioLogado) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    if (usuarioLogado.role !== "admin") {
      return NextResponse.json(
        { error: "Apenas administradores podem excluir usuários" },
        { status: 403 }
      );
    }

    const { id } = await params;

    const usuarioExistente = await prisma.user.findFirst({
      where: {
        id,
        empresaId: usuarioLogado.empresaId,
      },
      select: { id: true },
    });

    if (!usuarioExistente) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.solicitacao.deleteMany({
        where: {
          empresaId: usuarioLogado.empresaId,
          userId: id,
        },
      });

      await tx.user.delete({
        where: { id },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);

    return NextResponse.json(
      { error: "Erro ao excluir usuário" },
      { status: 500 }
    );
  }
}