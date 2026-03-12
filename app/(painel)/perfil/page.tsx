"use client";

import { useEffect, useMemo, useState } from "react";

type Perfil = {
  id: string;
  nome: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function PerfilPage() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);

  async function carregarPerfil() {
    try {
      setCarregando(true);

      const response = await fetch("/api/perfil", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao carregar perfil");
        return;
      }

      setPerfil(data);
      setNome(data.nome);
      setEmail(data.email);
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      alert("Erro ao carregar perfil");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarPerfil();
  }, []);

  async function salvarPerfil() {
    if (!nome.trim() || !email.trim()) {
      alert("Preencha nome e email.");
      return;
    }

    try {
      setSalvando(true);

      const response = await fetch("/api/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senhaAtual,
          novaSenha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao salvar perfil");
        return;
      }

      setPerfil(data);
      setNome(data.nome);
      setEmail(data.email);
      setSenhaAtual("");
      setNovaSenha("");
      alert("Perfil atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      alert("Erro ao salvar perfil");
    } finally {
      setSalvando(false);
    }
  }

  const perfilLabel = useMemo(() => {
    if (!perfil) return "-";
    return perfil.role === "admin" ? "Administrador" : "Usuário";
  }, [perfil]);

  if (carregando) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">Carregando perfil...</p>
      </div>
    );
  }

  if (!perfil) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
        <p className="text-sm text-red-700">Não foi possível carregar o perfil.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Perfil</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Atualize seus dados de acesso e segurança
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <aside className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-xl font-semibold text-white">
            {perfil.nome.slice(0, 1).toUpperCase()}
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold text-zinc-900">{perfil.nome}</h2>
            <p className="mt-1 break-all text-sm text-zinc-500">{perfil.email}</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
              {perfilLabel}
            </span>
          </div>

          <div className="mt-6 space-y-4 border-t border-zinc-200 pt-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Perfil de acesso
              </p>
              <p className="mt-1 text-sm text-zinc-800">{perfilLabel}</p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Criado em
              </p>
              <p className="mt-1 text-sm text-zinc-800">
                {new Date(perfil.createdAt).toLocaleString("pt-BR")}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                ID do usuário
              </p>
              <p className="mt-1 break-all text-sm text-zinc-800">{perfil.id}</p>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-zinc-900">
                Dados pessoais
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Atualize as informações básicas do seu acesso
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                  Nome
                </label>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:bg-white focus:ring-2 focus:ring-zinc-200"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:bg-white focus:ring-2 focus:ring-zinc-200"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-zinc-900">Segurança</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Altere sua senha com segurança
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                  Senha atual
                </label>
                <input
                  type="password"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:bg-white focus:ring-2 focus:ring-zinc-200"
                  placeholder="Preencha para alterar a senha"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                  Nova senha
                </label>
                <input
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:bg-white focus:ring-2 focus:ring-zinc-200"
                  placeholder="Nova senha"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={salvarPerfil}
                disabled={salvando}
                className="rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {salvando ? "Salvando..." : "Salvar alterações"}
              </button>

              <button
                type="button"
                onClick={carregarPerfil}
                className="rounded-2xl border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                Recarregar dados
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}