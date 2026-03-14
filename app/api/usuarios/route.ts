import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function adicionarDias(data: Date, dias: number) {
  const novaData = new Date(data);
  novaData.setDate(novaData.getDate() + dias);
  return novaData;
}

export async function GET() {
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
        { error: "Apenas administradores podem visualizar convites" },
        { status: 403 }
      );
    }

    const convites = await prisma.userInvite.findMany({
      where: {
        empresaId: usuarioLogado.empresaId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        status: true,
        token: true,
        expiresAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json(convites);
  } catch (error) {
    console.error("Erro ao buscar convites:", error);

    return NextResponse.json(
      { error: "Erro ao buscar convites" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
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
        { error: "Apenas administradores podem criar convites" },
        { status: 403 }
      );
    }

    const body = (await req.json()) as {
      nome?: string;
      email?: string;
      role?: string;
    };

    const nome = String(body.nome ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const role = String(body.role ?? "user").trim();

    if (!nome || !email) {
      return NextResponse.json(
        { error: "Nome e email são obrigatórios." },
        { status: 400 }
      );
    }

    if (role !== "user" && role !== "admin") {
      return NextResponse.json(
        { error: "Perfil inválido." },
        { status: 400 }
      );
    }

    const usuarioExistente = await prisma.user.findFirst({
      where: {
        empresaId: usuarioLogado.empresaId,
        email,
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

    const conviteExistente = await prisma.userInvite.findFirst({
      where: {
        empresaId: usuarioLogado.empresaId,
        email,
        status: "pendente",
      },
      select: {
        id: true,
      },
    });

    if (conviteExistente) {
      return NextResponse.json(
        { error: "Já existe um convite pendente para esse email." },
        { status: 400 }
      );
    }

    const token = crypto.randomBytes(24).toString("hex");
    const expiresAt = adicionarDias(new Date(), 7);

    const convite = await prisma.userInvite.create({
      data: {
        empresaId: usuarioLogado.empresaId,
        nome,
        email,
        role,
        token,
        status: "pendente",
        expiresAt,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        status: true,
        token: true,
        expiresAt: true,
        createdAt: true,
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const linkConvite = `${appUrl}/aceitar-convite/${convite.token}`;

    return NextResponse.json(
      {
        success: true,
        convite,
        linkConvite,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar convite:", error);

    return NextResponse.json(
      { error: "Erro ao criar convite" },
      { status: 500 }
    );
  }
}