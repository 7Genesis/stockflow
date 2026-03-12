import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const empresa = await prisma.empresa.findUnique({
      where: {
        id: usuario.empresaId,
      },
      select: {
        id: true,
        nome: true,
        cnpj: true,
        createdAt: true,
        _count: {
          select: {
            usuarios: true,
            produtos: true,
            fornecedores: true,
            solicitacoes: true,
            nfeImports: true,
          },
        },
      },
    });

    if (!empresa) {
      return NextResponse.json(
        { error: "Empresa não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(empresa);
  } catch (error) {
    console.error("Erro ao buscar empresa:", error);

    return NextResponse.json(
      { error: "Erro ao buscar empresa" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    if (usuario.role !== "admin") {
      return NextResponse.json(
        { error: "Apenas administradores podem editar a empresa" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const nome = String(body.nome ?? "").trim();
    const cnpj = String(body.cnpj ?? "").replace(/\D/g, "");

    if (!nome) {
      return NextResponse.json(
        { error: "Nome da empresa é obrigatório" },
        { status: 400 }
      );
    }

    if (cnpj) {
      const empresaComMesmoCnpj = await prisma.empresa.findFirst({
        where: {
          cnpj,
          NOT: {
            id: usuario.empresaId,
          },
        },
        select: {
          id: true,
        },
      });

      if (empresaComMesmoCnpj) {
        return NextResponse.json(
          { error: "Já existe outra empresa com esse CNPJ" },
          { status: 400 }
        );
      }
    }

    const empresa = await prisma.empresa.update({
      where: {
        id: usuario.empresaId,
      },
      data: {
        nome,
        cnpj: cnpj || null,
      },
      select: {
        id: true,
        nome: true,
        cnpj: true,
        createdAt: true,
        _count: {
          select: {
            usuarios: true,
            produtos: true,
            fornecedores: true,
            solicitacoes: true,
            nfeImports: true,
          },
        },
      },
    });

    return NextResponse.json(empresa);
  } catch (error) {
    console.error("Erro ao atualizar empresa:", error);

    return NextResponse.json(
      { error: "Erro ao atualizar empresa" },
      { status: 500 }
    );
  }
}