"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type UsuarioEmpresa = {
  id: string;
  nome: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function AdminEmpresaUsuariosPage() {
  const params = useParams();
  const router = useRouter();

  const empresaId = String(params?.empresaId ?? "").trim();

  const [usuarios, setUsuarios] = useState<UsuarioEmpresa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [senhaTemp, setSenhaTemp] = useState<Record<string, string>>({});
  const [processando, setProcessando] = useState<string | null>(null);
  const [saindo, setSaindo] = useState(false);

  async function carregarUsuarios() {
    try {
      if (!empresaId) {
        setErro("Empresa não informada.");
        setCarregando(false);
        return;
      }

      setCarregando(true);
      setErro("");

      const response = await fetch(
        `/api/admin/empresas/${encodeURIComponent(empresaId)}/usuarios`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Erro ao carregar usuários");
        return;
      }

      setUsuarios(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      setErro("Erro ao carregar usuários");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (empresaId) {
      carregarUsuarios();
    }
  }, [empresaId]);

  async function resetarSenha(userId: string) {
    const novaSenha = String(senhaTemp[userId] ?? "").trim();

    if (!novaSenha || novaSenha.length < 6) {
      alert("Informe uma nova senha com pelo menos 6 caracteres.");
      return;
    }

    try {
      setProcessando(userId);

      const response = await fetch(
        `/api/admin/usuarios/${encodeURIComponent(userId)}/resetar-senha`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            novaSenha,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao resetar senha");
        return;
      }

      alert("Senha redefinida com sucesso.");

      setSenhaTemp((prev) => ({
        ...prev,
        [userId]: "",
      }));
    } catch (error) {
      console.error("Erro ao resetar senha:", error);
      alert("Erro ao resetar senha");
    } finally {
      setProcessando(null);
    }
  }

  async function sair() {
    try {
      setSaindo(true);

      await fetch("/api/logout", {
        method: "POST",
      });

      router.replace("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
      router.replace("/login");
    } finally {
      setSaindo(false);
    }
  }

  const usuariosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) return usuarios;

    return usuarios.filter((usuario) => {
      return (
        usuario.nome.toLowerCase().includes(termo) ||
        usuario.email.toLowerCase().includes(termo) ||
        usuario.role.toLowerCase().includes(termo)
      );
    });
  }, [usuarios, busca]);

  if (carregando) {
    return (
      <main className="min-h-screen bg-zinc-100 p-6 md:p-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-zinc-500">Carregando usuários...</p>
        </div>
      </main>
    );
  }

  if (erro) {
    return (
      <main className="min-h-screen bg-zinc-100 p-6 md:p-8">
        <div className="mx-auto max-w-5xl space-y-4">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => router.push("/admin/empresas")}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Voltar
            </button>

            <button
              onClick={sair}
              disabled={saindo}
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 disabled:opacity-60"
            >
              {saindo ? "Saindo..." : "Sair"}
            </button>
          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
            <p className="text-sm text-red-700">{erro}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-100 p-6 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">

        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">
              Usuários da empresa
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Reset de senha manual pelo superadmin
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={carregarUsuarios}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Atualizar
            </button>

            <button
              onClick={() => router.push("/admin/empresas")}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Voltar
            </button>

            <button
              onClick={sair}
              disabled={saindo}
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 disabled:opacity-60"
            >
              {saindo ? "Saindo..." : "Sair"}
            </button>
          </div>
        </div>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">

          <div className="grid gap-4 md:grid-cols-2">

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Buscar usuário
              </label>

              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Nome, email ou perfil"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900"
              />
            </div>

            <div className="flex items-end">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
                Total de usuários:{" "}
                <span className="font-semibold text-zinc-900">
                  {usuariosFiltrados.length}
                </span>
              </div>
            </div>

          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">

          {usuariosFiltrados.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
              Nenhum usuário encontrado.
            </div>
          ) : (
            <div className="space-y-4">

              {usuariosFiltrados.map((usuario) => {
                const estaProcessando = processando === usuario.id;

                return (
                  <div
                    key={usuario.id}
                    className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                  >
                    <div className="grid gap-4 md:grid-cols-[1fr_220px_170px] md:items-end">

                      <div>
                        <p className="font-medium text-zinc-900">
                          {usuario.nome}
                        </p>

                        <p className="text-sm text-zinc-600">
                          {usuario.email}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">

                          <span className="rounded-full bg-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700">
                            {usuario.role}
                          </span>

                          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-600 border border-zinc-200">
                            Criado em{" "}
                            {new Date(usuario.createdAt).toLocaleDateString(
                              "pt-BR"
                            )}
                          </span>

                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                          Nova senha
                        </label>

                        <input
                          type="text"
                          value={senhaTemp[usuario.id] ?? ""}
                          onChange={(e) =>
                            setSenhaTemp((prev) => ({
                              ...prev,
                              [usuario.id]: e.target.value,
                            }))
                          }
                          placeholder="Nova senha"
                          className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900"
                        />
                      </div>

                      <button
                        onClick={() => resetarSenha(usuario.id)}
                        disabled={estaProcessando}
                        className="rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
                      >
                        {estaProcessando ? "Salvando..." : "Resetar senha"}
                      </button>

                    </div>
                  </div>
                );
              })}

            </div>
          )}
        </section>
      </div>
    </main>
  );
}