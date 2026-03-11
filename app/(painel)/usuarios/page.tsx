"use client";

import { useEffect, useState } from "react";

type Usuario = {
  id: string;
  nome: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("user");
  const [salvando, setSalvando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  async function carregarUsuarios() {
    try {
      const response = await fetch("/api/usuarios", {
        cache: "no-store",
      });

      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  function limparFormulario() {
    setEditandoId(null);
    setNome("");
    setEmail("");
    setSenha("");
    setRole("user");
    setMostrarSenha(false);
  }

  function preencherFormulario(usuario: Usuario) {
    setEditandoId(usuario.id);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setSenha("");
    setRole(usuario.role);
    setMostrarSenha(false);
  }

  function gerarSenha() {
    const caracteres =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

    let senhaGerada = "";

    for (let i = 0; i < 8; i++) {
      senhaGerada += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }

    setSenha(senhaGerada);
    setMostrarSenha(true);
  }

  async function copiarSenha() {
    if (!senha) {
      alert("Não há senha para copiar.");
      return;
    }

    try {
      await navigator.clipboard.writeText(senha);
      alert("Senha copiada.");
    } catch (error) {
      console.error("Erro ao copiar senha:", error);
      alert("Não foi possível copiar a senha.");
    }
  }

  async function salvarUsuario() {
    if (!nome.trim() || !email.trim()) {
      alert("Informe nome e email");
      return;
    }

    if (!editandoId && !senha.trim()) {
      alert("Informe a senha para criar o usuário");
      return;
    }

    try {
      setSalvando(true);

      const url = editandoId
        ? `/api/usuarios/${editandoId}`
        : "/api/usuarios";

      const method = editandoId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao salvar usuário");
        return;
      }

      limparFormulario();
      await carregarUsuarios();

      alert(
        editandoId
          ? "Usuário atualizado com sucesso"
          : "Usuário cadastrado com sucesso"
      );
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao salvar usuário");
    } finally {
      setSalvando(false);
    }
  }

  async function excluirUsuario(id: string) {
    const confirmar = window.confirm("Deseja excluir este usuário?");
    if (!confirmar) return;

    try {
      const response = await fetch(`/api/usuarios/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao excluir usuário");
        return;
      }

      if (editandoId === id) {
        limparFormulario();
      }

      await carregarUsuarios();
      alert("Usuário excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao excluir usuário");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Usuários</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Cadastro, edição e redefinição de senha
        </p>
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">
              {editandoId ? "Editar usuário" : "Novo usuário"}
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {editandoId
                ? "Preencha a senha apenas se quiser redefinir o acesso deste usuário."
                : "Ao criar um usuário, defina a senha inicial para ele acessar o sistema."}
            </p>
          </div>

          {editandoId && (
            <button
              onClick={limparFormulario}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Cancelar edição
            </button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-zinc-600">
              {editandoId ? "Nova senha" : "Senha inicial"}
            </label>

            <input
              type={mostrarSenha ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            />

            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100"
              >
                {mostrarSenha ? "Ocultar" : "Ver"}
              </button>

              <button
                type="button"
                onClick={gerarSenha}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100"
              >
                Gerar senha
              </button>

              <button
                type="button"
                onClick={copiarSenha}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100"
              >
                Copiar
              </button>
            </div>

            <p className="mt-1 text-xs text-zinc-500">
              {editandoId
                ? "Deixe em branco para manter a senha atual."
                : "Este campo é obrigatório no cadastro."}
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-600">Perfil</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            >
              <option value="user">Usuário</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <button
          onClick={salvarUsuario}
          disabled={salvando}
          className="mt-6 rounded-xl bg-zinc-900 px-6 py-3 text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {salvando
            ? "Salvando..."
            : editandoId
            ? "Atualizar usuário"
            : "Salvar usuário"}
        </button>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900">
          Lista de usuários
        </h2>

        {usuarios.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhum usuário cadastrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b text-left text-zinc-500">
                  <th className="p-3">Nome</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Perfil</th>
                  <th className="p-3">Data</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="border-b">
                    <td className="p-3">{usuario.nome}</td>
                    <td className="p-3">{usuario.email}</td>
                    <td className="p-3">
                      <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                        {usuario.role}
                      </span>
                    </td>
                    <td className="p-3">
                      {new Date(usuario.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => preencherFormulario(usuario)}
                          className="font-medium text-blue-600 hover:text-blue-800"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => excluirUsuario(usuario.id)}
                          className="font-medium text-red-600 hover:text-red-800"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}