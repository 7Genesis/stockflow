import Link from "next/link";

const WHATSAPP_NUMERO = "5511939281926";

const planos = [
  {
    nome: "Free",
    preco: "R$ 0",
    periodo: "/mês",
    destaque: false,
    descricao: "Ideal para conhecer o sistema e operações pequenas.",
    recursos: [
      "Até 100 produtos",
      "Até 3 usuários",
      "Controle de estoque",
      "Movimentações",
      "Relatórios básicos",
    ],
    mensagem:
      "Olá! Quero contratar o plano Free do StockFlow e liberar minha empresa no sistema.",
    botao: "Escolher Free",
  },
  {
    nome: "Pro",
    preco: "R$ 49",
    periodo: "/mês",
    destaque: true,
    descricao: "Plano recomendado para empresas em operação real.",
    recursos: [
      "Produtos ilimitados",
      "Usuários ilimitados",
      "Importação de NF-e",
      "Relatórios completos",
      "Auditoria de ações",
      "Suporte prioritário",
    ],
    mensagem:
      "Olá! Quero contratar o plano Pro do StockFlow e liberar minha empresa no sistema.",
    botao: "Contratar Pro",
  },
  {
    nome: "Enterprise",
    preco: "Sob consulta",
    periodo: "",
    destaque: false,
    descricao: "Para operações maiores e necessidades personalizadas.",
    recursos: [
      "Tudo do Pro",
      "Condições comerciais personalizadas",
      "Atendimento prioritário",
      "Ajustes sob demanda",
      "Suporte dedicado",
    ],
    mensagem:
      "Olá! Quero contratar o plano Enterprise do StockFlow e conversar sobre uma proposta personalizada.",
    botao: "Falar sobre Enterprise",
  },
];

function criarLinkWhatsApp(mensagem: string) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

export default function PlanosPage() {
  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            Escolha o plano ideal para sua empresa
          </h1>
          <p className="mt-4 text-lg text-zinc-600">
            Após o cadastro, escolha um plano e entre em contato para concluir a
            contratação e liberar o acesso da empresa.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {planos.map((plano) => (
            <section
              key={plano.nome}
              className={`rounded-3xl border bg-white p-8 shadow-sm ${
                plano.destaque
                  ? "border-zinc-900 ring-2 ring-zinc-900"
                  : "border-zinc-200"
              }`}
            >
              {plano.destaque && (
                <div className="mb-4 inline-flex rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
                  Mais escolhido
                </div>
              )}

              <h2 className="text-2xl font-bold text-zinc-900">{plano.nome}</h2>
              <p className="mt-2 text-sm text-zinc-500">{plano.descricao}</p>

              <div className="mt-6">
                <span className="text-4xl font-bold text-zinc-900">
                  {plano.preco}
                </span>
                <span className="ml-1 text-zinc-500">{plano.periodo}</span>
              </div>

              <ul className="mt-6 space-y-3">
                {plano.recursos.map((recurso) => (
                  <li key={recurso} className="text-sm text-zinc-700">
                    • {recurso}
                  </li>
                ))}
              </ul>

              <a
                href={criarLinkWhatsApp(plano.mensagem)}
                target="_blank"
                rel="noreferrer"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition ${
                  plano.destaque
                    ? "bg-zinc-900 text-white hover:bg-zinc-800"
                    : "border border-zinc-300 text-zinc-800 hover:bg-zinc-50"
                }`}
              >
                {plano.botao}
              </a>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-zinc-900">
            Como funciona a liberação
          </h3>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-zinc-50 p-4">
              <p className="text-sm font-semibold text-zinc-900">1. Cadastro</p>
              <p className="mt-2 text-sm text-zinc-600">
                A empresa cria a conta com CPF ou CNPJ.
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-4">
              <p className="text-sm font-semibold text-zinc-900">
                2. Escolha do plano
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                O cliente escolhe o plano desejado nesta página.
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-4">
              <p className="text-sm font-semibold text-zinc-900">3. Contato</p>
              <p className="mt-2 text-sm text-zinc-600">
                O botão abre o WhatsApp com a mensagem pronta.
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-4">
              <p className="text-sm font-semibold text-zinc-900">4. Liberação</p>
              <p className="mt-2 text-sm text-zinc-600">
                Após o pagamento, a empresa é liberada no painel admin.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/registro"
              className="rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Criar empresa
            </Link>

            <Link
              href="/login"
              className="rounded-2xl border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Já tenho conta
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}