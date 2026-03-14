import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function nomeMes(index: number) {
  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  return meses[index] ?? "";
}

export async function GET() {
  try {
    const usuario = await getSessionUser();

    if (!usuario) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    if (usuario.role !== "superadmin") {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const pagamentos = await prisma.pagamentoSaas.findMany({
      where: {
        status: "confirmado",
      },
      select: {
        valor: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const agora = new Date();
    const resultado: { mes: string; receita: number; chave: string }[] = [];

    for (let i = 5; i >= 0; i--) {
      const data = new Date(agora.getFullYear(), agora.getMonth() - i, 1);
      const ano = data.getFullYear();
      const mes = data.getMonth();

      resultado.push({
        mes: `${nomeMes(mes)}/${String(ano).slice(-2)}`,
        receita: 0,
        chave: `${ano}-${String(mes + 1).padStart(2, "0")}`,
      });
    }

    for (const pagamento of pagamentos) {
      const data = new Date(pagamento.createdAt);
      const chave = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(
        2,
        "0"
      )}`;

      const item = resultado.find((r) => r.chave === chave);
      if (item) {
        item.receita += pagamento.valor;
      }
    }

    return NextResponse.json(
      resultado.map(({ chave, ...item }) => item)
    );
  } catch (error) {
    console.error("Erro ao carregar receita mensal:", error);

    return NextResponse.json(
      { error: "Erro ao carregar receita mensal" },
      { status: 500 }
    );
  }
}