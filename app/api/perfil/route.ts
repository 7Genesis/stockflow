import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const usuario = await prisma.user.findFirst({
      where: {
        id: session.id,
        empresaId: session.empresaId,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(usuario);
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);

    return NextResponse.json(
      { error: "Erro ao buscar perfil" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const nome = String(body.nome ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const senhaAtual = String(body.senhaAtual ?? "").trim();
    const novaSenha = String(body.novaSenha ?? "").trim();

    if (!nome || !email) {
      return NextResponse.json(
        { error: "Nome e email são obrigatórios" },
        { status: 400 }
      );
    }

    const usuario = await prisma.user.findFirst({
      where: {
        id: session.id,
        empresaId: session.empresaId,
      },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const emailEmUso = await prisma.user.findFirst({
      where: {
        empresaId: session.empresaId,
        email,
        NOT: {
          id: session.id,
        },
      },
      select: {
        id: true,
      },
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
      senha?: string;
    } = {
      nome,
      email,
    };

    if (novaSenha) {
      if (!senhaAtual) {
        return NextResponse.json(
          { error: "Informe a senha atual para alterar a senha" },
          { status: 400 }
        );
      }

      const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);

      if (!senhaValida) {
        return NextResponse.json(
          { error: "Senha atual inválida" },
          { status: 401 }
        );
      }

      data.senha = await bcrypt.hash(novaSenha, 10);
    }

    const atualizado = await prisma.user.update({
      where: { id: session.id },
      data,
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        createdAt: true,
        empresaId: true,
      },
    });

    const sessionUser = {
      id: atualizado.id,
      nome: atualizado.nome,
      email: atualizado.email,
      role: atualizado.role as "admin" | "user",
      empresaId: atualizado.empresaId,
    };

    const sessionValue = Buffer.from(
      JSON.stringify(sessionUser),
      "utf-8"
    ).toString("base64");

    const response = NextResponse.json({
      id: atualizado.id,
      nome: atualizado.nome,
      email: atualizado.email,
      role: atualizado.role,
      createdAt: atualizado.createdAt,
    });

    response.cookies.set("session", sessionValue, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);

    return NextResponse.json(
      { error: "Erro ao atualizar perfil" },
      { status: 500 }
    );
  }
}