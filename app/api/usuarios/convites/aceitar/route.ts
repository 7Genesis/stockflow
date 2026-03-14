import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

type Body = {
  token?: string;
  senha?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    const token = String(body.token ?? "").trim();
    const senha = String(body.senha ?? "").trim();

    if (!token || !senha) {
      return NextResponse.json(
        { error: "Token e senha são obrigatórios." },
        { status: 400 }
      );
    }

    if (senha.length < 6) {
      return NextResponse.json(
        { error: "A senha deve ter pelo menos 6 caracteres." },
        { status: 400 }
      );
    }

    const convite = await prisma.userInvite.findUnique({
      where: {
        token,
      },
      select: {
        id: true,
        empresaId: true,
        nome: true,
        email: true,
        role: true,
        status: true,
        expiresAt: true,
      },
    });

    if (!convite) {
      return NextResponse.json(
        { error: "Convite não encontrado." },
        { status: 404 }
      );
    }

    if (convite.status !== "pendente") {
      return NextResponse.json(
        { error: "Este convite não está mais disponível." },
        { status: 400 }
      );
    }

    if (new Date(convite.expiresAt).getTime() < Date.now()) {
      return NextResponse.json(
        { error: "Este convite expirou." },
        { status: 400 }
      );
    }

    const usuarioExistente = await prisma.user.findFirst({
      where: {
        empresaId: convite.empresaId,
        email: convite.email,
      },
      select: {
        id: true,
      },
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { error: "Já existe um usuário com esse email nesta empresa." },
        { status: 400 }
      );
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await prisma.$transaction(async (tx) => {
      await tx.user.create({
        data: {
          empresaId: convite.empresaId,
          nome: convite.nome,
          email: convite.email,
          senha: senhaHash,
          role: convite.role,
        },
      });

      await tx.userInvite.update({
        where: {
          id: convite.id,
        },
        data: {
          status: "aceito",
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Convite aceito com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao aceitar convite:", error);

    return NextResponse.json(
      { error: "Erro ao aceitar convite." },
      { status: 500 }
    );
  }
}