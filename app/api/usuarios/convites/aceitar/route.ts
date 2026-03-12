import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { registrarAuditoria } from "@/lib/audit";

type AceitarBody = {
  token?: string;
  senha?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AceitarBody;

    const token = String(body.token ?? "").trim();
    const senha = String(body.senha ?? "").trim();

    if (!token || !senha) {
      return NextResponse.json(
        { error: "Token e senha são obrigatórios" },
        { status: 400 }
      );
    }

    if (senha.length < 6) {
      return NextResponse.json(
        { error: "A senha deve ter pelo menos 6 caracteres" },
        { status: 400 }
      );
    }

    const convite = await prisma.userInvite.findUnique({
      where: { token },
    });

    if (!convite) {
      return NextResponse.json(
        { error: "Convite não encontrado" },
        { status: 404 }
      );
    }

    if (convite.status !== "pendente") {
      return NextResponse.json(
        { error: "Este convite não está mais disponível" },
        { status: 400 }
      );
    }

    if (new Date(convite.expiresAt).getTime() < Date.now()) {
      return NextResponse.json(
        { error: "Este convite expirou" },
        { status: 400 }
      );
    }

    const usuarioExistente = await prisma.user.findFirst({
      where: {
        empresaId: convite.empresaId,
        email: convite.email,
      },
      select: { id: true },
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { error: "Já existe um usuário com este email nesta empresa" },
        { status: 400 }
      );
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.$transaction(async (tx) => {
      const novoUsuario = await tx.user.create({
        data: {
          empresaId: convite.empresaId,
          nome: convite.nome,
          email: convite.email,
          senha: senhaHash,
          role: convite.role,
        },
        select: {
          id: true,
          nome: true,
          email: true,
          role: true,
          empresaId: true,
        },
      });

      await tx.userInvite.update({
        where: { id: convite.id },
        data: {
          status: "aceito",
        },
      });

      return novoUsuario;
    });

    await registrarAuditoria({
      empresaId: convite.empresaId,
      userId: usuario.id,
      acao: "aprovar",
      entidade: "convite",
      entidadeId: convite.id,
      descricao: `Convite aceito por ${usuario.email}`,
    });

    return NextResponse.json({
      success: true,
      usuario,
    });
  } catch (error) {
    console.error("Erro ao aceitar convite:", error);

    return NextResponse.json(
      { error: "Erro ao aceitar convite" },
      { status: 500 }
    );
  }
}