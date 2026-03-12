"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type SessionUser = {
  id: string;
  nome: string;
  email: string;
  role: "admin" | "user";
  empresaId: string;
};

export default function LoginPage() {
  const router = useRouter();

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

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold text-zinc-900">StockFlow</h1>
        <p className="mb-6 text-sm text-zinc-500">Entre no sistema</p>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-600">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
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
            className="w-full rounded-xl bg-zinc-900 px-6 py-3 text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/registro")}
            className="w-full rounded-xl border border-zinc-300 px-6 py-3 text-zinc-700 hover:bg-zinc-50"
          >
            Criar empresa
          </button>
        </div>
      </div>
    </main>
  );
}