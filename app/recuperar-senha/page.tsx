"use client";

import Link from "next/link";
import { useState } from "react";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [resetLink, setResetLink] = useState("");

  async function solicitarRecuperacao() {
    if (!email.trim()) {
      alert("Informe seu email.");
      return;
    }

    try {
      setCarregando(true);
      setMensagem("");
      setResetLink("");

      const response = await fetch("/api/auth/esqueci-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao solicitar redefinição");
        return;
      }

      setMensagem(
        data.message ||
          "Solicitação registrada com sucesso."
      );

      if (data.resetLink) {
        setResetLink(data.resetLink);
      }
    } catch (error) {
      console.error("Erro ao solicitar recuperação:", error);
      alert("Erro ao solicitar recuperação de senha.");
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
          Recuperar senha
        </h1>
        <p className="mb-6 text-sm text-zinc-500">
          Informe seu email para gerar um link de redefinição.
        </p>

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

          <button
            type="button"
            onClick={solicitarRecuperacao}
            disabled={carregando}
            className="w-full rounded-xl bg-zinc-900 px-6 py-3 text-white transition hover:bg-zinc-800 disabled:opacity-60"
          >
            {carregando ? "Gerando link..." : "Gerar link de redefinição"}
          </button>

          {mensagem && (
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
              {mensagem}
            </div>
          )}

          {resetLink && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
              <p className="font-medium">Link gerado:</p>
              <a
                href={resetLink}
                className="mt-2 block break-all underline"
              >
                {resetLink}
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}