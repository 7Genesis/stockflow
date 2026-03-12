import prisma from "@/lib/prisma";

type RegistrarAuditoriaParams = {
  empresaId: string;
  userId: string;
  acao: string;
  entidade: string;
  entidadeId?: string | null;
  descricao?: string | null;
};

export async function registrarAuditoria({
  empresaId,
  userId,
  acao,
  entidade,
  entidadeId,
  descricao,
}: RegistrarAuditoriaParams) {
  try {
    await prisma.auditLog.create({
      data: {
        empresaId,
        userId,
        acao,
        entidade,
        entidadeId: entidadeId || null,
        descricao: descricao || null,
      },
    });
  } catch (error) {
    console.error("Erro ao registrar auditoria:", error);
  }
}