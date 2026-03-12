"use client";

import { useEffect, useState } from "react";

type Convite = {
  id: string;
  nome: string;
  email: string;
  role: string;
  token: string;
  status: string;
  expiresAt: string;
  createdAt: string;
};

export default function ConvitesPage() {
  const [convites, setConvites] = useState<Convite[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);

  async function carregarConvites() {
    try {
      setCarregando(true);

      const response = await fetch("/api/usuarios/convites", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao carregar convites");
        return;
      }

      setConvites(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar convites:", error);
      alert("Erro ao carregar convites");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarConvites();
  }, []);

  async function criarConvite() {
    if (!nome.trim() || !email.trim()) {
      alert("Preencha nome e email.");
      return;
    }

    try {
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

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao criar convite");
        return;
      }

      setNome("");
      setEmail("");
      setRole("user");
      await carregarConvites();
      alert("Convite criado com sucesso");
    } catch (error) {
      console.error("Erro ao criar convite:", error);
      alert("Erro ao criar convite");
    } finally {
      setSalvando(false);
    }
  }

 async function cancelarConvite(id: string) {
  const confirmar = window.confirm("Deseja cancelar este convite?");
  if (!confirmar) return;

  try {
    const response = await fetch(`/api/usuarios/convites/${id}/cancelar`, {
      method: "PATCH",
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Erro ao cancelar convite");
      return;
    }

    await carregarConvites();
    alert("Convite cancelado com sucesso");
  } catch (error) {
    console.error("Erro ao cancelar convite:", error);
    alert("Erro ao cancelar convite");
  }
}

  async function reenviarConvite(id: string) {
    try {
      const response = await fetch(`/api/usuarios/convites/${id}/reenviar`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao reenviar convite");
        return;
      }

      await carregarConvites();
      alert("Convite renovado com sucesso");
    } catch (error) {
      console.error("Erro ao reenviar convite:", error);
      alert("Erro ao reenviar convite");
    }
  }

  function copiarLink(token: string) {
    const link = `${window.location.origin}/aceitar-convite?token=${token}`;
    navigator.clipboard.writeText(link);
    alert("Link copiado com sucesso");
  }

  function formatarStatus(status: string) {
    if (status === "pendente") return "Pendente";
    if (status === "aceito") return "Aceito";
    if (status === "cancelado") return "Cancelado";
    return status;
  }

  function classeStatus(status: string) {
    if (status === "aceito") return "bg-emerald-100 text-emerald-700";
    if (status === "cancelado") return "bg-zinc-200 text-zinc-700";
    return "bg-yellow-100 text-yellow-700";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Convites</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Convide novos usuários para a empresa
        </p>
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-zinc-900">
            Novo convite
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Gere um link para cadastro do usuário na empresa
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Nome
            </label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Perfil
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm"
            >
              <option value="user">Usuário</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
        </div>

        <button
          onClick={criarConvite}
          disabled={salvando}
          className="mt-6 rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white"
        >
          {salvando ? "Criando..." : "Criar convite"}
        </button>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-zinc-900">
            Convites criados
          </h2>
        </div>

        {carregando ? (
          <p className="text-sm text-zinc-500">Carregando convites...</p>
        ) : convites.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhum convite criado.</p>
        ) : (
          <div className="space-y-4">
            {convites.map((convite) => (
              <div
                key={convite.id}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="font-medium text-zinc-900">{convite.nome}</p>
                    <p className="text-sm text-zinc-500">{convite.email}</p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        {convite.role}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${classeStatus(
                          convite.status
                        )}`}
                      >
                        {formatarStatus(convite.status)}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-zinc-500">
                      Expira em:{" "}
                      {new Date(convite.expiresAt).toLocaleString("pt-BR")}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => copiarLink(convite.token)}
                      className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-white"
                    >
                      Copiar link
                    </button>

                    {convite.status !== "aceito" && (
                      <button
                        onClick={() => reenviarConvite(convite.id)}
                        className="rounded-xl border border-blue-300 px-4 py-2 text-sm text-blue-700 hover:bg-white"
                      >
                        Reenviar
                      </button>
                    )}

                    {convite.status === "pendente" && (
                      <button
                        onClick={() => cancelarConvite(convite.id)}
                        className="rounded-xl border border-red-300 px-4 py-2 text-sm text-red-700 hover:bg-white"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}