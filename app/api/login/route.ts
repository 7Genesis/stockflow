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

    const usuario = await prisma.user.findUnique({
      where: { email },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return NextResponse.json({ error: "Senha inválida" }, { status: 401 });
    }

    const sessionUser = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role as "admin" | "user",
    };

    const response = NextResponse.json({
      success: true,
      usuario: sessionUser,
    });

    response.cookies.set(
      "session",
      Buffer.from(JSON.stringify(sessionUser)).toString("base64"),
      {
        httpOnly: false,
        path: "/",
        maxAge: 60 * 60 * 24,
      }
    );

    return response;
  } catch (error) {
    console.error("Erro no login:", error);

    return NextResponse.json(
      { error: "Erro ao fazer login" },
      { status: 500 }
    );
  }
}