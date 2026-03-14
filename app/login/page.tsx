"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type SessionUser = {
  id: string;
  nome: string;
  email: string;
  role: "superadmin" | "admin" | "user";
  empresaId: string;
};

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const erro = searchParams.get("erro");
  const sucesso = searchParams.get("sucesso");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    if (!email.trim() || !senha.trim()) {
      alert("Informe email e senha");
      return;
    }

    try {
      setCarregando(true);

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        usuario?: SessionUser;
      };

      if (!response.ok || !data.usuario) {
        alert(data.error || "Erro ao entrar");
        return;
      }

      if (data.usuario.role === "superadmin") {
        router.replace("/admin/empresas");
        return;
      }

      router.replace(
        data.usuario.role === "admin"
          ? "/dashboard"
          : "/minhas-solicitacoes"
      );
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Não foi possível conectar ao servidor");
    } finally {
      setCarregando(false);
    }
  }

  function mensagemErro() {
    if (erro === "assinatura") {
      return "Sua empresa não possui uma assinatura ativa, está suspensa ou ainda não foi liberada.";
    }

    if (erro === "sessao") {
      return "Sua sessão expirou. Faça login novamente.";
    }

    return "";
  }

  function mensagemSucesso() {
    if (sucesso === "senha-redefinida") {
      return "Senha redefinida com sucesso. Agora você já pode entrar no sistema.";
    }

    if (sucesso === "convite-aceito") {
      return "Convite aceito com sucesso. Agora você já pode entrar no sistema.";
    }

    return "";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-zinc-500 transition hover:text-zinc-700"
        >
          ← Voltar para a página inicial
        </Link>

        <h1 className="mb-2 text-3xl font-bold text-zinc-900">StockFlow</h1>
        <p className="mb-6 text-sm text-zinc-500">Entre no sistema</p>

        {mensagemErro() && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {mensagemErro()}
          </div>
        )}

        {mensagemSucesso() && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {mensagemSucesso()}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-600">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
              placeholder="Digite sua senha"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  entrar();
                }
              }}
            />
          </div>

          <button
            type="button"
            onClick={entrar}
            disabled={carregando}
            className="w-full rounded-xl bg-zinc-900 px-6 py-3 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/recuperar-senha")}
            className="w-full rounded-xl border border-zinc-300 px-6 py-3 text-zinc-700 transition hover:bg-zinc-50"
          >
            Esqueci minha senha
          </button>

          <button
            type="button"
            onClick={() => router.push("/registro")}
            className="w-full rounded-xl border border-zinc-300 px-6 py-3 text-zinc-700 transition hover:bg-zinc-50"
          >
            Criar empresa
          </button>

          <button
            type="button"
            onClick={() => router.push("/planos")}
            className="w-full rounded-xl border border-zinc-300 px-6 py-3 text-zinc-700 transition hover:bg-zinc-50"
          >
            Ver planos
          </button>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
            <p className="text-sm text-zinc-500">Carregando login...</p>
          </div>
        </main>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}