"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type ConviteData = {
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
    tipoDocumento?: string | null;
    documento?: string | null;
  };
};

export default function AceitarConvitePage() {
  const params = useParams();
  const router = useRouter();

  const token = String(params?.token ?? "").trim();

  const [convite, setConvite] = useState<ConviteData | null>(null);
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  async function lerJsonSeguro(response: Response) {
    const texto = await response.text();

    try {
      return JSON.parse(texto);
    } catch {
      throw new Error(texto || "Resposta inválida da API.");
    }
  }

  async function carregarConvite() {
    try {
      if (!token) {
        setErro("Token do convite não informado.");
        setCarregando(false);
        return;
      }

      setCarregando(true);
      setErro("");

      const response = await fetch(
        `/api/usuarios/convites/token/${encodeURIComponent(token)}`,
        {
          cache: "no-store",
        }
      );

      const data = await lerJsonSeguro(response);

      if (!response.ok) {
        setErro(data.error || "Convite não encontrado.");
        return;
      }

      setConvite(data);
    } catch (error) {
      console.error("Erro ao carregar convite:", error);
      setErro(
        error instanceof Error ? error.message : "Erro ao carregar convite."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarConvite();
  }, [token]);

  async function aceitarConvite() {
    try {
      if (!senha.trim() || senha.trim().length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
      }

      if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
      }

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

      const data = await lerJsonSeguro(response);

      if (!response.ok) {
        alert(data.error || "Erro ao aceitar convite.");
        return;
      }

      router.replace("/login?sucesso=convite-aceito");
    } catch (error) {
      console.error("Erro ao aceitar convite:", error);
      alert(
        error instanceof Error ? error.message : "Erro ao aceitar convite."
      );
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
        <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-sm text-zinc-500">Carregando convite...</p>
        </div>
      </main>
    );
  }

  if (erro || !convite) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
        <div className="w-full max-w-lg rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-zinc-900">Convite inválido</h1>
          <p className="mt-3 text-sm text-red-700">
            {erro || "Não foi possível localizar este convite."}
          </p>

          <button
            onClick={() => router.push("/login")}
            className="mt-6 rounded-xl border border-zinc-300 px-6 py-3 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            Ir para login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 py-8">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-zinc-900">
          Aceitar convite
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Você foi convidado para entrar na empresa{" "}
          <strong className="text-zinc-900">{convite.empresa.nome}</strong>.
        </p>

        <div className="mt-6 space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm text-zinc-700">
            <strong>Nome:</strong> {convite.nome}
          </p>
          <p className="text-sm text-zinc-700">
            <strong>Email:</strong> {convite.email}
          </p>
          <p className="text-sm text-zinc-700">
            <strong>Perfil:</strong> {convite.role}
          </p>
          <p className="text-sm text-zinc-700">
            <strong>Expira em:</strong>{" "}
            {new Date(convite.expiresAt).toLocaleDateString("pt-BR")}
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-600">
              Criar senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 px-4 py-3"
              placeholder="Digite sua senha"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-600">
              Confirmar senha
            </label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 px-4 py-3"
              placeholder="Confirme sua senha"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={aceitarConvite}
            disabled={salvando}
            className="rounded-xl bg-zinc-900 px-6 py-3 text-sm text-white hover:bg-zinc-800 disabled:opacity-60"
          >
            {salvando ? "Criando conta..." : "Aceitar convite"}
          </button>

          <button
            onClick={() => router.push("/login")}
            className="rounded-xl border border-zinc-300 px-6 py-3 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            Voltar
          </button>
        </div>
      </div>
    </main>
  );
}