export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-zinc-900">StockFlow</h1>
        <p className="text-zinc-600 text-lg">Sistema de Controle de Estoque</p>

        <a
          href="/login"
          className="inline-block rounded-xl bg-zinc-900 px-6 py-3 text-white transition hover:bg-zinc-800"
        >
          Entrar no sistema
        </a>
      </div>
    </main>
  );
}