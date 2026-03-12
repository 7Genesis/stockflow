"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
  const router = useRouter();

  const [empresaNome, setEmpresaNome] = useState("");
  const [empresaCnpj, setEmpresaCnpj] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function registrar() {
    if (!empresaNome.trim() || !nome.trim() || !email.trim() || !senha.trim()) {
      alert("Preencha empresa, nome, email e senha.");
      return;
    }

    try {
      setCarregando(true);

      const response = await fetch("/api/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          empresaNome,
          empresaCnpj,
          nome,
          email,
          senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao criar conta");
        return;
      }

      alert("Conta criada com sucesso.");
      router.replace("/dashboard");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Erro ao criar conta");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold text-zinc-900">Criar empresa</h1>
        <p className="mb-6 text-sm text-zinc-500">
          Cadastre sua empresa e crie o primeiro administrador
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-zinc-600">
              Nome da empresa
            </label>
            <input
              value={empresaNome}
              onChange={(e) => setEmpresaNome(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-zinc-600">
              CNPJ
            </label>
            <input
              value={empresaCnpj}
              onChange={(e) => setEmpresaCnpj(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
              placeholder="Opcional"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-600">
              Seu nome
            </label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-zinc-600">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>
        </div>

        <button
          onClick={registrar}
          disabled={carregando}
          className="mt-6 w-full rounded-xl bg-zinc-900 px-6 py-3 text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {carregando ? "Criando..." : "Criar conta"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-3 w-full rounded-xl border border-zinc-300 px-6 py-3 text-zinc-700 hover:bg-zinc-50"
        >
          Já tenho conta
        </button>
      </div>
    </main>
  );
}