import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{
    token: string;
  }>;
};

export async function GET(_req: Request, { params }: Params) {
  try {
    const { token } = await params;

    const convite = await prisma.userInvite.findUnique({
      where: {
        token,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        status: true,
        expiresAt: true,
        createdAt: true,
        empresa: {
          select: {
            id: true,
            nome: true,
            cnpj: true,
          },
        },
      },
    });

    if (!convite) {
      return NextResponse.json(
        { error: "Convite não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(convite);
  } catch (error) {
    console.error("Erro ao buscar convite por token:", error);

    return NextResponse.json(
      { error: "Erro ao buscar convite" },
      { status: 500 }
    );
  }
}