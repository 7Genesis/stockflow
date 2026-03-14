import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { isEmailDescartavel } from "@/lib/disposable-email";
import { onlyDigits, validarDocumento } from "@/lib/documento";

export const dynamic = "force-dynamic";

type RegistroBody = {
  empresaNome?: string;
  tipoDocumento?: "cpf" | "cnpj";
  documento?: string;
  nome?: string;
  email?: string;
  senha?: string;
};

function adicionarDias(data: Date, dias: number) {
  const novaData = new Date(data);
  novaData.setDate(novaData.getDate() + dias);
  return novaData;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RegistroBody;

    const empresaNome = String(body.empresaNome ?? "").trim();
    const tipoDocumento = String(body.tipoDocumento ?? "").trim().toLowerCase();
    const documento = onlyDigits(body.documento);
    const nome = String(body.nome ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const senha = String(body.senha ?? "").trim();

    if (!empresaNome || !tipoDocumento || !documento || !nome || !email || !senha) {
      return NextResponse.json(
        {
          error:
            "Empresa, tipo de documento, documento, nome, email e senha são obrigatórios.",
        },
        { status: 400 }
      );
    }

    if (empresaNome.length < 3) {
      return NextResponse.json(
        { error: "O nome da empresa deve ter pelo menos 3 caracteres." },
        { status: 400 }
      );
    }

    if (tipoDocumento !== "cpf" && tipoDocumento !== "cnpj") {
      return NextResponse.json(
        { error: "Tipo de documento inválido." },
        { status: 400 }
      );
    }

    if (!validarDocumento(tipoDocumento, documento)) {
      return NextResponse.json(
        { error: "CPF ou CNPJ inválido." },
        { status: 400 }
      );
    }

    if (isEmailDescartavel(email)) {
      return NextResponse.json(
        { error: "Emails descartáveis não são permitidos." },
        { status: 400 }
      );
    }

    if (senha.length < 6) {
      return NextResponse.json(
        { error: "A senha deve ter pelo menos 6 caracteres." },
        { status: 400 }
      );
    }

    const empresaExistente = await prisma.empresa.findFirst({
      where: {
        documento,
      },
      select: {
        id: true,
      },
    });

    if (empresaExistente) {
      return NextResponse.json(
        { error: "Já existe uma empresa cadastrada com esse documento." },
        { status: 400 }
      );
    }

    const usuarioExistente = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { error: "Já existe um usuário com esse email." },
        { status: 400 }
      );
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const agora = new Date();
    const vencimentoTeste = adicionarDias(agora, 7);

    const resultado = await prisma.$transaction(async (tx) => {
      const empresa = await tx.empresa.create({
        data: {
          nome: empresaNome,
          tipoDocumento,
          documento,
        },
        select: {
          id: true,
          nome: true,
          tipoDocumento: true,
          documento: true,
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

      const assinatura = await tx.assinatura.create({
        data: {
          empresaId: empresa.id,
          status: "teste",
          plano: "free",
          dataInicio: agora,
          dataVencimento: vencimentoTeste,
        },
        select: {
          id: true,
          status: true,
          plano: true,
          dataInicio: true,
          dataVencimento: true,
        },
      });

      return { empresa, usuario, assinatura };
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
      empresa: resultado.empresa,
      usuario: sessionUser,
      assinatura: resultado.assinatura,
    });

    response.cookies.set("session", sessionValue, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error: any) {
    console.error("Erro ao registrar empresa:", error);

    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "Já existe um registro com esses dados." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao registrar empresa." },
      { status: 500 }
    );
  }
}