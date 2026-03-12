import Link from "next/link";

const planos = [
  {
    nome: "Free",
    preco: "R$ 0",
    periodo: "/mês",
    destaque: false,
    descricao: "Ideal para começar a organizar operações básicas.",
    recursos: [
      "Até 2 usuários",
      "Até 100 produtos",
      "Controle de estoque",
      "Movimentações",
      "Dashboard básico",
      "Relatórios CSV",
    ],
  },
  {
    nome: "Pro",
    preco: "R$ 29,90",
    periodo: "/mês",
    destaque: true,
    descricao: "Perfeito para empresas que precisam de mais controle e escala.",
    recursos: [
      "Até 10 usuários",
      "Até 1.000 produtos",
      "Relatórios CSV e Excel",
      "Importação de NF-e",
      "Auditoria de atividades",
      "Dashboard inteligente",
    ],
  },
  {
    nome: "Enterprise",
    preco: "Sob consulta",
    periodo: "",
    destaque: false,
    descricao: "Para operações maiores com necessidade de expansão.",
    recursos: [
      "Usuários ilimitados",
      "Produtos ilimitados",
      "Relatórios avançados",
      "Auditoria completa",
      "Maior capacidade operacional",
      "Suporte prioritário",
    ],
  },
];

export default function PlanosPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <section className="border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-zinc-200 bg-white px-4 py-1 text-sm text-zinc-600 shadow-sm">
              Planos StockFlow
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
              Escolha o plano ideal para sua operação
            </h1>

            <p className="mt-5 text-lg text-zinc-600">
              Tenha controle de estoque, relatórios, usuários e movimentações
              com uma plataforma moderna e pronta para crescer com sua empresa.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/registro"
                className="rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                Criar empresa
              </Link>

              <Link
                href="/"
                className="rounded-2xl border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                Voltar para início
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {planos.map((plano) => (
            <div
              key={plano.nome}
              className={`rounded-3xl border p-8 shadow-sm ${
                plano.destaque
                  ? "border-zinc-900 bg-zinc-900 text-white shadow-xl"
                  : "border-zinc-200 bg-white text-zinc-900"
              }`}
            >
              {plano.destaque && (
                <div className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  Mais escolhido
                </div>
              )}

              <h2 className="text-2xl font-bold">{plano.nome}</h2>

              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-bold">{plano.preco}</span>
                {plano.periodo && (
                  <span
                    className={`pb-1 text-sm ${
                      plano.destaque ? "text-zinc-300" : "text-zinc-500"
                    }`}
                  >
                    {plano.periodo}
                  </span>
                )}
              </div>

              <p
                className={`mt-4 text-sm leading-6 ${
                  plano.destaque ? "text-zinc-300" : "text-zinc-600"
                }`}
              >
                {plano.descricao}
              </p>

              <div className="mt-8 space-y-3">
                {plano.recursos.map((recurso) => (
                  <div
                    key={recurso}
                    className={`rounded-xl border px-4 py-3 text-sm ${
                      plano.destaque
                        ? "border-white/10 bg-white/5 text-zinc-100"
                        : "border-zinc-200 bg-zinc-50 text-zinc-700"
                    }`}
                  >
                    {recurso}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/registro"
                  className={`inline-flex w-full justify-center rounded-2xl px-6 py-3 text-sm font-medium transition ${
                    plano.destaque
                      ? "bg-white text-zinc-900 hover:bg-zinc-100"
                      : "bg-zinc-900 text-white hover:bg-zinc-800"
                  }`}
                >
                  Começar agora
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-900">
              Precisa de uma solução mais personalizada?
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-600">
              O StockFlow pode evoluir para diferentes cenários operacionais,
              incluindo gestão ampliada, relatórios avançados e maior escala.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
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
                Entrar no sistema
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}