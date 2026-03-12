"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type ConviteInfo = {
  id: string;
  nome: string;
  email: string;
  role: string;
  status: string;
  expiresAt: string;
  createdAt: string;
  empresa: {
    id: string;
    nome: string;
    cnpj: string | null;
  };
};

export default function AceitarConviteClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") || "";

  const [convite, setConvite] = useState<ConviteInfo | null>(null);
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarConvite() {
      if (!token) {
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);

        const response = await fetch(
          `/api/usuarios/convites/token/${encodeURIComponent(token)}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.error || "Convite inválido");
          return;
        }

        setConvite(data);
      } catch (error) {
        console.error("Erro ao carregar convite:", error);
        alert("Erro ao carregar convite");
      } finally {
        setCarregando(false);
      }
    }

    carregarConvite();
  }, [token]);

  const conviteExpirado = useMemo(() => {
    if (!convite) return false;
    return new Date(convite.expiresAt).getTime() < Date.now();
  }, [convite]);

  const conviteDisponivel = useMemo(() => {
    if (!convite) return false;
    return convite.status === "pendente" && !conviteExpirado;
  }, [convite, conviteExpirado]);

  async function aceitarConvite() {
    if (!token) {
      alert("Token de convite inválido.");
      return;
    }

    if (!senha || senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmacaoSenha) {
      alert("As senhas não conferem.");
      return;
    }

    try {
      setSalvando(true);

      const response = await fetch("/api/usuarios/convites/aceitar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao aceitar convite");
        return;
      }

      alert("Conta criada com sucesso. Faça login.");
      router.replace("/login");
    } catch (error) {
      console.error("Erro ao aceitar convite:", error);
      alert("Erro ao aceitar convite");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-sm text-zinc-500">Carregando convite...</p>
        </div>
      </main>
    );
  }

  if (!token || !convite) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-zinc-900">
            Convite inválido
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            O link informado não é válido ou não foi encontrado.
          </p>

          <button
            onClick={() => router.replace("/login")}
            className="mt-6 w-full rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white"
          >
            Ir para login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 py-10">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-xl font-semibold text-white">
            {convite.empresa.nome.slice(0, 1).toUpperCase()}
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold text-zinc-900">
              {convite.empresa.nome}
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              {convite.empresa.cnpj || "CNPJ não informado"}
            </p>
          </div>

          <div className="mt-6 space-y-4 border-t border-zinc-200 pt-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Convidado
              </p>
              <p className="mt-1 text-sm text-zinc-800">{convite.nome}</p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Email
              </p>
              <p className="mt-1 break-all text-sm text-zinc-800">
                {convite.email}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Perfil
              </p>
              <p className="mt-1 text-sm text-zinc-800">
                {convite.role === "admin" ? "Administrador" : "Usuário"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Expira em
              </p>
              <p className="mt-1 text-sm text-zinc-800">
                {new Date(convite.expiresAt).toLocaleString("pt-BR")}
              </p>
            </div>
          </div>
        </aside>

        <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-zinc-900">Aceitar convite</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Defina sua senha para acessar a empresa.
          </p>

          {!conviteDisponivel && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-700">
                Este convite não está disponível.
              </p>
              <p className="mt-1 text-sm text-red-600">
                {convite.status !== "pendente"
                  ? "O convite já foi utilizado ou cancelado."
                  : "O convite expirou."}
              </p>
            </div>
          )}

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Nova senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={!conviteDisponivel}
                className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Confirmar senha
              </label>
              <input
                type="password"
                value={confirmacaoSenha}
                onChange={(e) => setConfirmacaoSenha(e.target.value)}
                disabled={!conviteDisponivel}
                className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={aceitarConvite}
              disabled={salvando || !conviteDisponivel}
              className="rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {salvando ? "Criando conta..." : "Criar conta"}
            </button>

            <button
              type="button"
              onClick={() => router.replace("/login")}
              className="rounded-2xl border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Ir para login
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}