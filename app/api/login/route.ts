import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.email || !body.senha) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const email = String(body.email).trim().toLowerCase();
    const senha = String(body.senha).trim();

    const usuarios = await prisma.user.findMany({
      where: { email },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (usuarios.length === 0) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    let usuarioValido: (typeof usuarios)[number] | null = null;

    for (const usuario of usuarios) {
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (senhaValida) {
        usuarioValido = usuario;
        break;
      }
    }

    if (!usuarioValido) {
      return NextResponse.json(
        { error: "Senha inválida" },
        { status: 401 }
      );
    }

    const sessionUser = {
      id: usuarioValido.id,
      nome: usuarioValido.nome,
      email: usuarioValido.email,
      role: usuarioValido.role as "admin" | "user",
      empresaId: usuarioValido.empresaId,
    };

    const sessionValue = Buffer.from(
      JSON.stringify(sessionUser),
      "utf-8"
    ).toString("base64");

    const response = NextResponse.json({
      success: true,
      usuario: sessionUser,
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
    console.error("Erro no login:", error);

    return NextResponse.json(
      { error: "Erro ao fazer login" },
      { status: 500 }
    );
  }
}