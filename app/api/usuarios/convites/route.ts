import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { registrarAuditoria } from "@/lib/audit";

export const dynamic = "force-dynamic";

type ConviteBody = {
  nome?: string;
  email?: string;
  role?: string;
};

export async function GET() {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    if (usuario.role !== "admin") {
      return NextResponse.json(
        { error: "Apenas administradores podem visualizar convites" },
        { status: 403 }
      );
    }

    const convites = await prisma.userInvite.findMany({
      where: {
        empresaId: usuario.empresaId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        token: true,
        status: true,
        expiresAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json(convites);
  } catch (error) {
    console.error("Erro ao listar convites:", error);

    return NextResponse.json(
      { error: "Erro ao listar convites" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    if (usuario.role !== "admin") {
      return NextResponse.json(
        { error: "Apenas administradores podem criar convites" },
        { status: 403 }
      );
    }

    const body = (await req.json()) as ConviteBody;

    const nome = String(body.nome ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const role = String(body.role ?? "user").trim();

    if (!nome || !email) {
      return NextResponse.json(
        { error: "Nome e email são obrigatórios" },
        { status: 400 }
      );
    }

    if (role !== "admin" && role !== "user") {
      return NextResponse.json({ error: "Perfil inválido" }, { status: 400 });
    }

    const usuarioExistente = await prisma.user.findFirst({
      where: {
        empresaId: usuario.empresaId,
        email,
      },
      select: { id: true },
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { error: "Já existe um usuário com esse email nesta empresa" },
        { status: 400 }
      );
    }

    const convitePendente = await prisma.userInvite.findFirst({
      where: {
        empresaId: usuario.empresaId,
        email,
        status: "pendente",
      },
      select: { id: true },
    });

    if (convitePendente) {
      return NextResponse.json(
        { error: "Já existe um convite pendente para esse email" },
        { status: 400 }
      );
    }

    const token = crypto.randomBytes(24).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    const convite = await prisma.userInvite.create({
      data: {
        empresaId: usuario.empresaId,
        nome,
        email,
        role,
        token,
        expiresAt,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        token: true,
        status: true,
        expiresAt: true,
        createdAt: true,
      },
    });

    await registrarAuditoria({
      empresaId: usuario.empresaId,
      userId: usuario.id,
      acao: "criar",
      entidade: "convite",
      entidadeId: convite.id,
      descricao: `Convite criado para ${convite.email} com perfil ${convite.role}`,
    });

    return NextResponse.json(convite, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar convite:", error);

    return NextResponse.json(
      { error: "Erro ao criar convite" },
      { status: 500 }
    );
  }
}