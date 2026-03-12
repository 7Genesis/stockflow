import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

type RegistroBody = {
  empresaNome?: string;
  empresaCnpj?: string;
  nome?: string;
  email?: string;
  senha?: string;
};

function onlyDigits(value: string | undefined | null) {
  return String(value ?? "").replace(/\D/g, "");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RegistroBody;

    const empresaNome = String(body.empresaNome ?? "").trim();
    const empresaCnpj = onlyDigits(body.empresaCnpj);
    const nome = String(body.nome ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const senha = String(body.senha ?? "").trim();

    if (!empresaNome || !nome || !email || !senha) {
      return NextResponse.json(
        { error: "Empresa, nome, email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    if (senha.length < 6) {
      return NextResponse.json(
        { error: "A senha deve ter pelo menos 6 caracteres" },
        { status: 400 }
      );
    }

    if (empresaCnpj) {
      const empresaExistente = await prisma.empresa.findFirst({
        where: {
          cnpj: empresaCnpj,
        },
        select: {
          id: true,
        },
      });

      if (empresaExistente) {
        return NextResponse.json(
          { error: "Já existe uma empresa cadastrada com esse CNPJ" },
          { status: 400 }
        );
      }
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const resultado = await prisma.$transaction(async (tx) => {
      const empresa = await tx.empresa.create({
        data: {
          nome: empresaNome,
          cnpj: empresaCnpj || null,
        },
      });

      const usuario = await tx.user.create({
        data: {
          empresaId: empresa.id,
          nome,
          email,
          senha: senhaHash,
          role: "admin",
        },
        select: {
          id: true,
          nome: true,
          email: true,
          role: true,
          empresaId: true,
        },
      });

      return { empresa, usuario };
    });

    const sessionUser = {
      id: resultado.usuario.id,
      nome: resultado.usuario.nome,
      email: resultado.usuario.email,
      role: resultado.usuario.role as "admin" | "user",
      empresaId: resultado.usuario.empresaId,
    };

    const sessionValue = Buffer.from(
      JSON.stringify(sessionUser),
      "utf-8"
    ).toString("base64");

    const response = NextResponse.json({
      success: true,
      empresa: {
        id: resultado.empresa.id,
        nome: resultado.empresa.nome,
        cnpj: resultado.empresa.cnpj,
      },
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
  } catch (error: any) {
    console.error("Erro ao registrar empresa:", error);

    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "Já existe um registro com esses dados" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao registrar empresa" },
      { status: 500 }
    );
  }
}