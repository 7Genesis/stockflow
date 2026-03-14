"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function RedefinirSenhaPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function redefinirSenha() {
    if (!novaSenha.trim() || !confirmarSenha.trim()) {
      alert("Preencha os dois campos.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      alert("As senhas não conferem.");
      return;
    }

    try {
      setCarregando(true);

      const response = await fetch("/api/auth/redefinir-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: params.token,
          novaSenha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao redefinir senha");
        return;
      }

      alert("Senha redefinida com sucesso.");
      router.replace("/login");
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      alert("Erro ao redefinir senha.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <Link
          href="/login"
          className="mb-6 inline-block text-sm text-zinc-500 transition hover:text-zinc-700"
        >
          ← Voltar para login
        </Link>

        <h1 className="mb-2 text-3xl font-bold text-zinc-900">
          Redefinir senha
        </h1>
        <p className="mb-6 text-sm text-zinc-500">
          Informe sua nova senha.
        </p>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-600">
              Nova senha
            </label>
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
              placeholder="Digite a nova senha"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-600">
              Confirmar nova senha
            </label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
              placeholder="Confirme a nova senha"
            />
          </div>

          <button
            type="button"
            onClick={redefinirSenha}
            disabled={carregando}
            className="w-full rounded-xl bg-zinc-900 px-6 py-3 text-white transition hover:bg-zinc-800 disabled:opacity-60"
          >
            {carregando ? "Salvando..." : "Salvar nova senha"}
          </button>
        </div>
      </div>
    </main>
  );
}