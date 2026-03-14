"use client";

import { useEffect, useMemo, useState } from "react";

type Usuario = {
  id: string;
  nome: string;
  email: string;
  role: string;
  createdAt: string;
};

type Convite = {
  id: string;
  nome: string;
  email: string;
  role: string;
  status: string;
  expiresAt: string;
  createdAt: string;
};

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [convites, setConvites] = useState<Convite[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");

  const [modalNovo, setModalNovo] = useState(false);
  const [modalEditar, setModalEditar] = useState<string | null>(null);
  const [modalSenha, setModalSenha] = useState<string | null>(null);

  const [salvando, setSalvando] = useState(false);
  const [processandoId, setProcessandoId] = useState<string | null>(null);

  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [novoRole, setNovoRole] = useState("user");

  const [editarNome, setEditarNome] = useState("");
  const [editarEmail, setEditarEmail] = useState("");
  const [editarRole, setEditarRole] = useState("user");

  const [senhaTemp, setSenhaTemp] = useState("");

  async function lerJsonSeguro(response: Response) {
    const contentType = response.headers.get("content-type") || "";
    const texto = await response.text();

    if (!contentType.includes("application/json")) {
      throw new Error(
        `Resposta inválida da API (${response.status}). Conteúdo recebido: ${texto.slice(
          0,
          120
        )}`
      );
    }

    try {
      return JSON.parse(texto);
    } catch {
      throw new Error("A API retornou um JSON inválido.");
    }
  }

  async function carregarUsuarios() {
    try {
      setCarregando(true);
      setErro("");

      const [usuariosResponse, convitesResponse] = await Promise.all([
        fetch("/api/usuarios", {
          cache: "no-store",
        }),
        fetch("/api/usuarios/convites", {
          cache: "no-store",
        }),
      ]);

      const usuariosData = await lerJsonSeguro(usuariosResponse);
      const convitesData = await lerJsonSeguro(convitesResponse);

      if (!usuariosResponse.ok) {
        setErro(usuariosData.error || "Erro ao carregar usuários");
        return;
      }

      if (!convitesResponse.ok) {
        setErro(convitesData.error || "Erro ao carregar convites");
        return;
      }

      setUsuarios(Array.isArray(usuariosData) ? usuariosData : []);
      setConvites(Array.isArray(convitesData) ? convitesData : []);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao carregar usuários."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

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

  function abrirEditar(usuario: Usuario) {
    setModalEditar(usuario.id);
    setEditarNome(usuario.nome);
    setEditarEmail(usuario.email);
    setEditarRole(usuario.role);
  }

  async function criarUsuario() {
    try {
      if (!novoNome.trim() || !novoEmail.trim() || !novaSenha.trim()) {
        alert("Preencha nome, email e senha.");
        return;
      }

      if (novaSenha.trim().length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
      }

      setSalvando(true);

      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: novoNome,
          email: novoEmail,
          senha: novaSenha,
          role: novoRole,
        }),
      });

      const data = await lerJsonSeguro(response);

      if (!response.ok) {
        alert(data.error || "Erro ao criar usuário");
        return;
      }

      setNovoNome("");
      setNovoEmail("");
      setNovaSenha("");
      setNovoRole("user");
      setModalNovo(false);

      await carregarUsuarios();
      alert("Usuário criado com sucesso.");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro ao criar usuário.");
    } finally {
      setSalvando(false);
    }
  }

  async function salvarEdicao(userId: string) {
    try {
      if (!editarNome.trim() || !editarEmail.trim()) {
        alert("Preencha nome e email.");
        return;
      }

      setSalvando(true);

      const response = await fetch(`/api/usuarios/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: editarNome,
          email: editarEmail,
          role: editarRole,
        }),
      });

      const data = await lerJsonSeguro(response);

      if (!response.ok) {
        alert(data.error || "Erro ao editar usuário");
        return;
      }

      setModalEditar(null);
      await carregarUsuarios();
      alert("Usuário atualizado com sucesso.");
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      alert("Erro ao editar usuário.");
    } finally {
      setSalvando(false);
    }
  }

  async function resetarSenha(userId: string) {
    try {
      if (!senhaTemp.trim() || senhaTemp.trim().length < 6) {
        alert("Informe uma nova senha com pelo menos 6 caracteres.");
        return;
      }

      setSalvando(true);

      const response = await fetch(`/api/usuarios/${userId}/resetar-senha`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          novaSenha: senhaTemp,
        }),
      });

      const data = await lerJsonSeguro(response);

      if (!response.ok) {
        alert(data.error || "Erro ao resetar senha");
        return;
      }

      setSenhaTemp("");
      setModalSenha(null);
      alert("Senha redefinida com sucesso.");
    } catch (error) {
      console.error("Erro ao resetar senha:", error);
      alert("Erro ao resetar senha.");
    } finally {
      setSalvando(false);
    }
  }

  async function removerUsuario(userId: string) {
    const confirmar = window.confirm("Deseja remover este usuário?");
    if (!confirmar) return;

    try {
      setProcessandoId(userId);

      const response = await fetch(`/api/usuarios/${userId}`, {
        method: "DELETE",
      });

      const data = await lerJsonSeguro(response);

      if (!response.ok) {
        alert(data.error || "Erro ao remover usuário");
        return;
      }

      await carregarUsuarios();
      alert("Usuário removido com sucesso.");
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
      alert("Erro ao remover usuário.");
    } finally {
      setProcessandoId(null);
    }
  }

  if (carregando) {
    return (
      <main className="space-y-6">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-zinc-500">Carregando usuários...</p>
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
          <h1 className="text-3xl font-bold text-zinc-900">Usuários</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Gerencie usuários e convites da sua empresa
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setModalNovo(true)}
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
          >
            Novo usuário
          </button>

          <button
            onClick={carregarUsuarios}
            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            Atualizar
          </button>
        </div>
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Buscar
        </label>
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Nome, email, perfil ou status"
          className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900"
        />
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">Usuários</h2>

        <div className="mt-4">
          {usuariosFiltrados.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
              Nenhum usuário encontrado.
            </div>
          ) : (
            <div className="space-y-3">
              {usuariosFiltrados.map((usuario) => (
                <div
                  key={usuario.id}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-medium text-zinc-900">{usuario.nome}</p>
                      <p className="text-sm text-zinc-600">{usuario.email}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700">
                          {usuario.role}
                        </span>
                        <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600">
                          Criado em{" "}
                          {new Date(usuario.createdAt).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => abrirEditar(usuario)}
                        className="rounded-lg border border-zinc-300 px-3 py-2 text-xs text-zinc-700 hover:bg-white"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => setModalSenha(usuario.id)}
                        className="rounded-lg border border-zinc-300 px-3 py-2 text-xs text-zinc-700 hover:bg-white"
                      >
                        Trocar senha
                      </button>

                      <button
                        onClick={() => removerUsuario(usuario.id)}
                        disabled={processandoId === usuario.id}
                        className="rounded-lg bg-red-600 px-3 py-2 text-xs text-white hover:bg-red-700 disabled:opacity-60"
                      >
                        {processandoId === usuario.id ? "Removendo..." : "Remover"}
                      </button>
                    </div>
                  </div>

                  {modalEditar === usuario.id && (
                    <div className="mt-4 grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 md:grid-cols-3">
                      <input
                        value={editarNome}
                        onChange={(e) => setEditarNome(e.target.value)}
                        placeholder="Nome"
                        className="rounded-xl border border-zinc-300 px-4 py-3 text-sm"
                      />
                      <input
                        value={editarEmail}
                        onChange={(e) => setEditarEmail(e.target.value)}
                        placeholder="Email"
                        className="rounded-xl border border-zinc-300 px-4 py-3 text-sm"
                      />
                      <select
                        value={editarRole}
                        onChange={(e) => setEditarRole(e.target.value)}
                        className="rounded-xl border border-zinc-300 px-4 py-3 text-sm"
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>

                      <div className="md:col-span-3 flex gap-2">
                        <button
                          onClick={() => salvarEdicao(usuario.id)}
                          disabled={salvando}
                          className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 disabled:opacity-60"
                        >
                          {salvando ? "Salvando..." : "Salvar"}
                        </button>
                        <button
                          onClick={() => setModalEditar(null)}
                          className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}

                  {modalSenha === usuario.id && (
                    <div className="mt-4 grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 md:grid-cols-[1fr_auto_auto]">
                      <input
                        type="text"
                        value={senhaTemp}
                        onChange={(e) => setSenhaTemp(e.target.value)}
                        placeholder="Nova senha"
                        className="rounded-xl border border-zinc-300 px-4 py-3 text-sm"
                      />
                      <button
                        onClick={() => resetarSenha(usuario.id)}
                        disabled={salvando}
                        className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 disabled:opacity-60"
                      >
                        {salvando ? "Salvando..." : "Confirmar"}
                      </button>
                      <button
                        onClick={() => {
                          setModalSenha(null);
                          setSenhaTemp("");
                        }}
                        className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">Convites</h2>

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
                  <p className="font-medium text-zinc-900">{convite.nome}</p>
                  <p className="text-sm text-zinc-600">{convite.email}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700">
                      {convite.role}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-600 border border-zinc-200">
                      {convite.status}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-600 border border-zinc-200">
                      Expira em{" "}
                      {new Date(convite.expiresAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {modalNovo && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900">Novo usuário</h2>

          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <input
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              placeholder="Nome"
              className="rounded-xl border border-zinc-300 px-4 py-3 text-sm"
            />
            <input
              value={novoEmail}
              onChange={(e) => setNovoEmail(e.target.value)}
              placeholder="Email"
              className="rounded-xl border border-zinc-300 px-4 py-3 text-sm"
            />
            <input
              type="text"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Senha"
              className="rounded-xl border border-zinc-300 px-4 py-3 text-sm"
            />
            <select
              value={novoRole}
              onChange={(e) => setNovoRole(e.target.value)}
              className="rounded-xl border border-zinc-300 px-4 py-3 text-sm"
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={criarUsuario}
              disabled={salvando}
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 disabled:opacity-60"
            >
              {salvando ? "Salvando..." : "Criar usuário"}
            </button>
            <button
              onClick={() => setModalNovo(false)}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}