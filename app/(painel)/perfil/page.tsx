"use client";

import { useEffect, useState } from "react";

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

  async function carregarPerfil() {
    try {
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
    }
  }

  useEffect(() => {
    carregarPerfil();
  }, []);

  async function salvarPerfil() {
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

  if (!perfil) {
    return <p className="text-sm text-zinc-500">Carregando perfil...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Perfil</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Atualize seus dados e altere sua senha
        </p>
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm text-zinc-500">Perfil atual</p>
          <p className="mt-1 font-medium text-zinc-900">{perfil.role}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Nome</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-600">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-600">
              Senha atual
            </label>
            <input
              type="password"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-600">
              Nova senha
            </label>
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>
        </div>

        <button
          onClick={salvarPerfil}
          disabled={salvando}
          className="mt-6 rounded-xl bg-zinc-900 px-6 py-3 text-white hover:bg-zinc-800 disabled:opacity-60"
        >
          {salvando ? "Salvando..." : "Salvar alterações"}
        </button>
      </section>
    </div>
  );
}