"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type MinhaAssinaturaResponse = {
  empresa: {
    id: string;
    nome: string;
    tipoDocumento: string | null;
    documento: string | null;
    createdAt: string;
  };
  assinatura: {
    id: string;
    status: string;
    plano: string;
    dataInicio: string;
    dataVencimento: string | null;
    dataCancelamento: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  totais: {
    usuarios: number;
    produtos: number;
  };
};

const WHATSAPP_SUPORTE = "5511939281926";

export default function MinhaAssinaturaPage() {
  const router = useRouter();

  const [dados, setDados] = useState<MinhaAssinaturaResponse | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarAssinatura() {
    try {
      setCarregando(true);
      setErro("");

      const response = await fetch("/api/minha-assinatura", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Erro ao carregar assinatura");
        return;
      }

      setDados(data);
    } catch (error) {
      console.error("Erro ao carregar assinatura:", error);
      setErro("Erro ao carregar assinatura");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarAssinatura();
  }, []);

  function formatarDocumento(tipo?: string | null, documento?: string | null) {
    if (!documento) return "Sem documento";
    if (tipo === "cpf") return `CPF • ${documento}`;
    if (tipo === "cnpj") return `CNPJ • ${documento}`;
    return documento;
  }

  function classeStatus(status?: string) {
    if (status === "ativa") return "bg-emerald-100 text-emerald-700";
    if (status === "teste") return "bg-blue-100 text-blue-700";
    if (status === "pendente") return "bg-orange-100 text-orange-700";
    if (status === "atrasada") return "bg-yellow-100 text-yellow-700";
    if (status === "suspensa") return "bg-red-100 text-red-700";
    if (status === "cancelada") return "bg-zinc-200 text-zinc-700";
    return "bg-zinc-100 text-zinc-700";
  }

  function nomePlano(plano?: string) {
    if (plano === "enterprise") return "Enterprise";
    if (plano === "pro") return "Pro";
    if (plano === "free") return "Free";
    return "Sem plano";
  }

  const linkSuporte = useMemo(() => {
    const empresaNome = dados?.empresa?.nome || "minha empresa";
    const plano = dados?.assinatura?.plano || "sem plano";

    const mensagem = `Olá! Gostaria de falar sobre minha assinatura no StockFlow.%0AEmpresa: ${empresaNome}%0APlano atual: ${plano}`;
    return `https://wa.me/${WHATSAPP_SUPORTE}?text=${mensagem}`;
  }, [dados]);

  if (carregando) {
    return (
      <main className="min-h-screen bg-zinc-100 p-6 md:p-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-zinc-500">Carregando assinatura...</p>
        </div>
      </main>
    );
  }

  if (erro || !dados) {
    return (
      <main className="min-h-screen bg-zinc-100 p-6 md:p-8">
        <div className="mx-auto max-w-5xl space-y-4">
          <button
            onClick={() => router.back()}
            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            Voltar
          </button>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
            <p className="text-sm text-red-700">
              {erro || "Erro ao carregar assinatura"}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const assinatura = dados.assinatura;

  return (
    <main className="min-h-screen bg-zinc-100 p-6 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">
              Minha assinatura
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Acompanhe seu plano, status e vencimento da assinatura
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={carregarAssinatura}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Atualizar
            </button>

            <button
              onClick={() => router.back()}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Voltar
            </button>
          </div>
        </div>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900">
                {dados.empresa.nome}
              </h2>
              <p className="mt-2 text-sm text-zinc-500">
                {formatarDocumento(
                  dados.empresa.tipoDocumento,
                  dados.empresa.documento
                )}
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Cadastro em{" "}
                {new Date(dados.empresa.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>

            <div className="flex items-start md:justify-end">
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${classeStatus(
                  assinatura?.status
                )}`}
              >
                {assinatura?.status || "sem assinatura"}
              </span>
            </div>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard
            titulo="Plano atual"
            valor={nomePlano(assinatura?.plano)}
          />
          <InfoCard
            titulo="Vencimento"
            valor={
              assinatura?.dataVencimento
                ? new Date(assinatura.dataVencimento).toLocaleDateString(
                    "pt-BR"
                  )
                : "-"
            }
          />
          <InfoCard
            titulo="Usuários"
            valor={String(dados.totais.usuarios)}
          />
          <InfoCard
            titulo="Produtos"
            valor={String(dados.totais.produtos)}
          />
        </div>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">
            Detalhes da assinatura
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailItem
              label="Plano"
              value={nomePlano(assinatura?.plano)}
            />
            <DetailItem
              label="Status"
              value={assinatura?.status || "-"}
            />
            <DetailItem
              label="Início"
              value={
                assinatura?.dataInicio
                  ? new Date(assinatura.dataInicio).toLocaleDateString("pt-BR")
                  : "-"
              }
            />
            <DetailItem
              label="Vencimento"
              value={
                assinatura?.dataVencimento
                  ? new Date(assinatura.dataVencimento).toLocaleDateString(
                      "pt-BR"
                    )
                  : "-"
              }
            />
            <DetailItem
              label="Cancelamento"
              value={
                assinatura?.dataCancelamento
                  ? new Date(
                      assinatura.dataCancelamento
                    ).toLocaleDateString("pt-BR")
                  : "-"
              }
            />
            <DetailItem
              label="Última atualização"
              value={
                assinatura?.updatedAt
                  ? new Date(assinatura.updatedAt).toLocaleDateString("pt-BR")
                  : "-"
              }
            />
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">
            Precisa alterar seu plano?
          </h2>

          <p className="mt-2 text-sm text-zinc-600">
            Se você quiser renovar, mudar de plano ou tirar dúvidas sobre sua
            assinatura, fale com o suporte.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={linkSuporte}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Falar com suporte
            </a>

            <button
              onClick={() => router.push("/planos")}
              className="rounded-xl border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Ver planos
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoCard({
  titulo,
  valor,
}: {
  titulo: string;
  valor: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-zinc-500">{titulo}</p>
      <p className="mt-2 text-2xl font-bold text-zinc-900">{valor}</p>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-1 text-base font-medium text-zinc-900">{value}</p>
    </div>
  );
}