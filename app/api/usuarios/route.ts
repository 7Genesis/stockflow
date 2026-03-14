import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { limiteUsuariosPorPlano } from "@/lib/plan-limits";

export const dynamic = "force-dynamic";

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
        { error: "Apenas administradores podem visualizar usuários" },
        { status: 403 }
      );
    }

    const usuarios = await prisma.user.findMany({
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
        createdAt: true,
      },
    });

    return NextResponse.json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);

    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
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
        { error: "Apenas administradores podem cadastrar usuários" },
        { status: 403 }
      );
    }

    const assinatura = await prisma.assinatura.findUnique({
      where: {
        empresaId: usuarioLogado.empresaId,
      },
      select: {
        plano: true,
      },
    });

    const plano = assinatura?.plano || "free";
    const limiteUsuarios = limiteUsuariosPorPlano(plano);

    const totalUsuarios = await prisma.user.count({
      where: {
        empresaId: usuarioLogado.empresaId,
      },
    });

    if (totalUsuarios >= limiteUsuarios) {
      return NextResponse.json(
        {
          error: `Seu plano ${plano} permite até ${limiteUsuarios} usuário(s).`,
        },
        { status: 400 }
      );
    }

    const body = (await req.json()) as {
      nome?: string;
      email?: string;
      senha?: string;
      role?: string;
    };

    const nome = String(body.nome ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const senha = String(body.senha ?? "").trim();
    const role = String(body.role ?? "user").trim();

    if (!nome || !email || !senha) {
      return NextResponse.json(
        { error: "Nome, email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    if (role !== "admin" && role !== "user") {
      return NextResponse.json(
        { error: "Perfil inválido" },
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
        { error: "Já existe um usuário com esse email nesta empresa" },
        { status: 400 }
      );
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.user.create({
      data: {
        empresaId: usuarioLogado.empresaId,
        nome,
        email,
        senha: senhaHash,
        role,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(usuario, { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);

    return NextResponse.json(
      { error: "Erro ao cadastrar usuário" },
      { status: 500 }
    );
  }
}