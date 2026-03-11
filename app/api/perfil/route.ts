import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

type SessionUser = {
  id: string;
  nome: string;
  email: string;
  role: "admin" | "user";
};

function getSession(request: NextRequest): SessionUser | null {
  const cookie = request.cookies.get("session")?.value;

  if (!cookie) return null;

  try {
    return JSON.parse(cookie) as SessionUser;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = getSession(request);

    if (!session) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const usuario = await prisma.user.findUnique({
      where: { id: session.id },
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

export async function PUT(request: NextRequest) {
  try {
    const session = getSession(request);

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

    const usuario = await prisma.user.findUnique({
      where: { id: session.id },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
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
      },
    });

    const response = NextResponse.json(atualizado);

    response.cookies.set(
      "session",
      JSON.stringify({
        id: atualizado.id,
        nome: atualizado.nome,
        email: atualizado.email,
        role: atualizado.role,
      }),
      {
        httpOnly: false,
        path: "/",
        maxAge: 60 * 60 * 24,
      }
    );

    return response;
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);

    return NextResponse.json(
      { error: "Erro ao atualizar perfil" },
      { status: 500 }
    );
  }
}