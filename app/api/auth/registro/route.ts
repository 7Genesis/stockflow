import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

type RegistroBody = {
  empresaNome?: string;
  documento?: string;
  nome?: string;
  email?: string;
  senha?: string;
};

function onlyDigits(value: string | undefined | null) {
  return String(value ?? "").replace(/\D/g, "");
}

function validarCPF(cpf: string) {
  const valor = onlyDigits(cpf);

  if (valor.length !== 11) return false;
  if (/^(\d)\1+$/.test(valor)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += Number(valor[i]) * (10 - i);
  }

  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== Number(valor[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += Number(valor[i]) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;

  return resto === Number(valor[10]);
}

function validarCNPJ(cnpj: string) {
  const valor = onlyDigits(cnpj);

  if (valor.length !== 14) return false;
  if (/^(\d)\1+$/.test(valor)) return false;

  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let soma = 0;
  for (let i = 0; i < 12; i++) {
    soma += Number(valor[i]) * pesos1[i];
  }

  let resto = soma % 11;
  const digito1 = resto < 2 ? 0 : 11 - resto;

  if (digito1 !== Number(valor[12])) return false;

  soma = 0;
  for (let i = 0; i < 13; i++) {
    soma += Number(valor[i]) * pesos2[i];
  }

  resto = soma % 11;
  const digito2 = resto < 2 ? 0 : 11 - resto;

  return digito2 === Number(valor[13]);
}

function identificarTipoDocumento(documento: string) {
  const valor = onlyDigits(documento);

  if (valor.length === 11 && validarCPF(valor)) {
    return "cpf" as const;
  }

  if (valor.length === 14 && validarCNPJ(valor)) {
    return "cnpj" as const;
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RegistroBody;

    const empresaNome = String(body.empresaNome ?? "").trim();
    const documento = onlyDigits(body.documento);
    const nome = String(body.nome ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const senha = String(body.senha ?? "").trim();

    if (!empresaNome || !documento || !nome || !email || !senha) {
      return NextResponse.json(
        {
          error:
            "Empresa, documento, nome, email e senha são obrigatórios.",
        },
        { status: 400 }
      );
    }

    if (senha.length < 6) {
      return NextResponse.json(
        { error: "A senha deve ter pelo menos 6 caracteres." },
        { status: 400 }
      );
    }

    const tipoDocumento = identificarTipoDocumento(documento);

    if (!tipoDocumento) {
      return NextResponse.json(
        { error: "CPF ou CNPJ inválido." },
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
        { error: "Já existe uma empresa cadastrada com este documento." },
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
          status: "pendente",
          plano: "free",
          dataInicio: new Date(),
          dataVencimento: null,
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

    return NextResponse.json(
      {
        success: true,
        message:
          "Cadastro realizado com sucesso. Aguarde a liberação do pagamento e ativação da empresa.",
        empresa: resultado.empresa,
        usuario: resultado.usuario,
        assinatura: resultado.assinatura,
      },
      { status: 201 }
    );
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