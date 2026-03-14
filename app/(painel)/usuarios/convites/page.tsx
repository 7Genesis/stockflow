"use client";

import { useEffect, useMemo, useState } from "react";

type Convite = {
  id: string;
  nome: string;
  email: string;
  role: string;
  status: string;
  token: string;
  expiresAt: string;
  createdAt: string;
};

export default function ConvitesPage() {
  const [convites, setConvites] = useState<Convite[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [salvando, setSalvando] = useState(false);

  async function lerJsonSeguro(response: Response) {
    const contentType = response.headers.get("content-type") || "";
    const texto = await response.text();

    if (!contentType.includes("application/json")) {
      throw new Error(
        `Resposta inválida da API (${response.status}). Conteúdo recebido: ${texto.slice(
          0,
          200
        )}`
      );
    }

    try {
      return JSON.parse(texto);
    } catch {
      throw new Error("A API retornou um JSON inválido.");
    }
  }

  async function carregarConvites() {
    try {
      setCarregando(true);
      setErro("");

      const response = await fetch("/api/usuarios/convites", {
        cache: "no-store",
      });

      const data = await lerJsonSeguro(response);

      if (!response.ok) {
        setErro(data.error || "Erro ao carregar convites");
        return;
      }

      setConvites(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar convites:", error);
      setErro(
        error instanceof Error ? error.message : "Erro ao carregar convites."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarConvites();
  }, []);

  async function criarConvite() {
    try {
      if (!nome.trim() || !email.trim()) {
        alert("Preencha nome e email.");
        return;
      }

      setSalvando(true);

      const response = await fetch("/api/usuarios/convites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          role,
        }),
      });

      const data = await lerJsonSeguro(response);

      if (!response.ok) {
        alert(data.error || "Erro ao criar convite");
        return;
      }

      setNome("");
      setEmail("");
      setRole("user");

      await carregarConvites();

      if (data?.linkConvite) {
        const copiar = window.confirm(
          `Convite criado com sucesso.\n\nDeseja copiar o link do convite?\n\n${data.linkConvite}`
        );

        if (copiar) {
          await navigator.clipboard.writeText(data.linkConvite);
          alert("Link do convite copiado.");
        }
      } else {
        alert("Convite criado com sucesso.");
      }
    } catch (error) {
      console.error("Erro ao criar convite:", error);
      alert(
        error instanceof Error ? error.message : "Erro ao criar convite."
      );
    } finally {
      setSalvando(false);
    }
  }

  async function copiarLink(token: string) {
    try {
      const appUrl = window.location.origin;
      const link = `${appUrl}/aceitar-convite/${token}`;
      await navigator.clipboard.writeText(link);
      alert("Link do convite copiado.");
    } catch (error) {
      console.error("Erro ao copiar link:", error);
      alert("Não foi possível copiar o link.");
    }
  }

  const convitesFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) return convites;

    return convites.filter((convite) => {
      return (
        convite.nome.toLowerCase().includes(termo) ||
        convite.email.toLowerCase().includes(termo) ||
        convite.role.toLowerCase().includes(termo) ||
        convite.status.toLowerCase().includes(termo)
      );
    });
  }, [convites, busca]);

  if (carregando) {
    return (
      <main className="space-y-6">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-zinc-500">Carregando convites...</p>
        </div>
      </main>
    );
  }

  if (erro) {
    return (
      <main className="space-y-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <p className="text-sm text-red-700">{erro}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Convites</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Convide novos usuários para sua empresa
          </p>
        </div>

        <button
          onClick={carregarConvites}
          className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
        >
          Atualizar
        </button>
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">Novo convite</h2>

        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
            className="rounded-xl border border-zinc-300 px-4 py-3 text-sm"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded-xl border border-zinc-300 px-4 py-3 text-sm"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-xl border border-zinc-300 px-4 py-3 text-sm"
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <button
            onClick={criarConvite}
            disabled={salvando}
            className="rounded-xl bg-zinc-900 px-4 py-3 text-sm text-white hover:bg-zinc-800 disabled:opacity-60"
          >
            {salvando ? "Criando..." : "Criar convite"}
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Buscar convite
        </label>
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Nome, email, perfil ou status"
          className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900"
        />
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">Convites enviados</h2>

        <div className="mt-4">
          {convitesFiltrados.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
              Nenhum convite encontrado.
            </div>
          ) : (
            <div className="space-y-3">
              {convitesFiltrados.map((convite) => (
                <div
                  key={convite.id}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-medium text-zinc-900">{convite.nome}</p>
                      <p className="text-sm text-zinc-600">{convite.email}</p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700">
                          {convite.role}
                        </span>
                        <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600">
                          {convite.status}
                        </span>
                        <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600">
                          Expira em{" "}
                          {new Date(convite.expiresAt).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => copiarLink(convite.token)}
                      className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-white"
                    >
                      Copiar link
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}