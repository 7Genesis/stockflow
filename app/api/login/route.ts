import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

type LoginBody = {
  email?: string;
  senha?: string;
};

type SessionUser = {
  id: string;
  nome: string;
  email: string;
  role: "superadmin" | "admin" | "user";
  empresaId: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginBody;

    const email = String(body.email ?? "").trim().toLowerCase();
    const senha = String(body.senha ?? "").trim();

    if (!email || !senha) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const usuarios = await prisma.user.findMany({
      where: { email },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        nome: true,
        email: true,
        senha: true,
        role: true,
        empresaId: true,
      },
    });

    if (usuarios.length === 0) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
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
        { error: "Senha inválida." },
        { status: 401 }
      );
    }

    if (usuarioValido.role !== "superadmin") {
      const assinatura = await prisma.assinatura.findUnique({
        where: {
          empresaId: usuarioValido.empresaId,
        },
        select: {
          id: true,
          status: true,
          plano: true,
          dataVencimento: true,
        },
      });

      if (!assinatura) {
        return NextResponse.json(
          { error: "Empresa sem assinatura vinculada." },
          { status: 403 }
        );
      }

      if (assinatura.status === "suspensa") {
        return NextResponse.json(
          { error: "Conta suspensa. Entre em contato com o suporte." },
          { status: 403 }
        );
      }

      if (assinatura.status === "cancelada") {
        return NextResponse.json(
          { error: "Conta cancelada." },
          { status: 403 }
        );
      }
    }

    const sessionUser: SessionUser = {
      id: usuarioValido.id,
      nome: usuarioValido.nome,
      email: usuarioValido.email,
      role: usuarioValido.role as "superadmin" | "admin" | "user",
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
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Erro no login:", error);

    return NextResponse.json(
      { error: "Erro ao fazer login." },
      { status: 500 }
    );
  }
}