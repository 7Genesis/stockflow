"use client";

import Link from "next/link";
import { useState } from "react";

const funcionalidades = [
  {
    titulo: "Controle de estoque",
    descricao:
      "Cadastre produtos, acompanhe entradas e saídas e monitore estoque mínimo em tempo real.",
  },
  {
    titulo: "Scanner de código de barras",
    descricao:
      "Agilize operações com leitura por câmera e identifique produtos rapidamente.",
  },
  {
    titulo: "Importação de NF-e",
    descricao:
      "Importe XML de nota fiscal e automatize a entrada de produtos no estoque.",
  },
  {
    titulo: "Relatórios e exportação",
    descricao:
      "Gere relatórios operacionais e exporte CSV e Excel para análise e controle.",
  },
  {
    titulo: "Gestão de usuários",
    descricao:
      "Convide colaboradores, defina permissões e gerencie acessos por empresa.",
  },
  {
    titulo: "Dashboard inteligente",
    descricao:
      "Visualize indicadores, produtos parados, itens críticos e movimentações mensais.",
  },
];

const beneficios = [
  "Multiempresa com separação de dados por organização",
  "Fluxo completo de solicitações e aprovações",
  "Auditoria de ações no sistema",
  "Alertas de estoque baixo",
  "Interface moderna e responsiva",
  "Deploy em nuvem com arquitetura escalável",
];

const perfis = [
  {
    titulo: "Lojas e comércios",
    descricao:
      "Controle entradas, saídas, reposição e produtos com estoque crítico de forma simples.",
  },
  {
    titulo: "Distribuidoras e depósitos",
    descricao:
      "Acompanhe movimentações em maior volume com relatórios e histórico operacional.",
  },
  {
    titulo: "Empresas com equipe",
    descricao:
      "Convide usuários, defina permissões e acompanhe solicitações e auditoria de ações.",
  },
];

const perguntas = [
  {
    pergunta: "O StockFlow funciona para pequenas empresas?",
    resposta:
      "Sim. O sistema foi pensado para operações que precisam de mais organização no controle de estoque, desde negócios menores até estruturas em crescimento.",
  },
  {
    pergunta: "É possível controlar entrada e saída de produtos?",
    resposta:
      "Sim. O StockFlow registra movimentações, acompanha estoque atual, alerta itens críticos e mantém histórico das operações.",
  },
  {
    pergunta: "O sistema possui relatórios?",
    resposta:
      "Sim. O sistema conta com relatórios operacionais e exportação em CSV e Excel para facilitar análise e acompanhamento.",
  },
  {
    pergunta: "É possível ter mais de um usuário por empresa?",
    resposta:
      "Sim. O StockFlow possui gestão de usuários, convites e controle de permissões por empresa.",
  },
];

const metricas = [
  {
    titulo: "Módulos integrados",
    valor: "8+",
    descricao: "Estoque, usuários, convites, NF-e, relatórios, dashboard e mais",
  },
  {
    titulo: "Relatórios",
    valor: "CSV + Excel",
    descricao: "Exportações prontas para análise operacional e gerencial",
  },
  {
    titulo: "Modelo operacional",
    valor: "Multiempresa",
    descricao: "Separação de dados por organização com maior controle",
  },
  {
    titulo: "Nível do sistema",
    valor: "SaaS",
    descricao: "Estrutura pronta para operação real e evolução comercial",
  },
];

export default function HomePage() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <Link href="/" className="text-lg font-bold text-zinc-900">
            StockFlow
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#funcionalidades"
              className="text-sm text-zinc-600 transition hover:text-zinc-900"
            >
              Funcionalidades
            </a>
            <Link
              href="/planos"
              className="text-sm text-zinc-600 transition hover:text-zinc-900"
            >
              Planos
            </Link>
            <Link
              href="/login"
              className="text-sm text-zinc-600 transition hover:text-zinc-900"
            >
              Entrar
            </Link>
            <Link
              href="/registro"
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Criar empresa
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuAberto((prev) => !prev)}
            className="inline-flex rounded-xl border border-zinc-300 px-3 py-2 text-sm text-zinc-700 md:hidden"
          >
            {menuAberto ? "Fechar" : "Menu"}
          </button>
        </div>

        {menuAberto && (
          <div className="border-t border-zinc-200 bg-white px-6 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              <a
                href="#funcionalidades"
                onClick={() => setMenuAberto(false)}
                className="text-sm text-zinc-700"
              >
                Funcionalidades
              </a>
              <Link
                href="/planos"
                onClick={() => setMenuAberto(false)}
                className="text-sm text-zinc-700"
              >
                Planos
              </Link>
              <Link
                href="/login"
                onClick={() => setMenuAberto(false)}
                className="text-sm text-zinc-700"
              >
                Entrar
              </Link>
              <Link
                href="/registro"
                onClick={() => setMenuAberto(false)}
                className="rounded-xl bg-zinc-900 px-4 py-3 text-center text-sm font-medium text-white"
              >
                Criar empresa
              </Link>
            </div>
          </div>
        )}
      </header>

      <section className="border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white pt-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="inline-flex rounded-full border border-zinc-200 bg-white px-4 py-1 text-sm text-zinc-600 shadow-sm">
              SaaS de gestão de estoque
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
              Organize seu estoque, centralize sua operação e acompanhe tudo em
              um só sistema.
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-zinc-600">
              O StockFlow foi desenvolvido para empresas que precisam de mais
              controle sobre produtos, movimentações, solicitações, usuários,
              NF-e e relatórios operacionais.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/registro"
                className="rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                Criar empresa
              </Link>

              <Link
                href="/planos"
                className="rounded-2xl border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                Ver planos
              </Link>

              <Link
                href="/login"
                className="rounded-2xl border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                Entrar
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-zinc-500">
              <span>Controle de estoque</span>
              <span>Relatórios CSV e Excel</span>
              <span>Auditoria de atividades</span>
            </div>
          </div>

          <div className="w-full">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl">
              <div className="grid gap-4 sm:grid-cols-2">
                {metricas.map((item) => (
                  <InfoCard
                    key={item.titulo}
                    titulo={item.titulo}
                    valor={item.valor}
                    descricao={item.descricao}
                  />
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-sm font-medium text-zinc-900">
                  Gestão operacional centralizada
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  Produtos, movimentações, solicitações, usuários, relatórios e
                  auditoria em um único painel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="funcionalidades"
        className="mx-auto max-w-7xl px-6 py-20 md:px-8"
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            Funcionalidades principais
          </h2>
          <p className="mt-3 text-zinc-600">
            Recursos desenvolvidos para controle operacional, segurança e tomada
            de decisão.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {funcionalidades.map((item) => (
            <div
              key={item.titulo}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-zinc-900">
                {item.titulo}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {item.descricao}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            Como funciona
          </h2>
          <p className="mt-3 text-zinc-600">
            Um fluxo simples para começar a organizar sua operação com o
            StockFlow.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white">
              1
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Cadastre sua empresa
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Crie sua conta, configure a empresa e acesse o painel
              administrativo em poucos minutos.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white">
              2
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Organize seus produtos
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Cadastre itens, controle estoque mínimo, registre entradas e
              saídas e acompanhe solicitações do time.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white">
              3
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Analise e decida
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Use dashboards, relatórios, auditoria e exportações para
              acompanhar a operação e tomar decisões com mais segurança.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
              Para quem é o StockFlow
            </h2>
            <p className="mt-3 text-zinc-600">
              Desenvolvido para operações que precisam de mais organização,
              visibilidade e controle.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {perfis.map((perfil) => (
              <div
                key={perfil.titulo}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-zinc-900">
                  {perfil.titulo}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {perfil.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                Estrutura pronta para operação real
              </h2>
              <p className="mt-3 max-w-2xl text-zinc-600">
                O StockFlow foi pensado para oferecer mais organização,
                rastreabilidade e produtividade para empresas que precisam de um
                controle de estoque mais eficiente.
              </p>
            </div>

            <div className="grid gap-3">
              {beneficios.map((beneficio) => (
                <div
                  key={beneficio}
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm"
                >
                  {beneficio}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            Perguntas frequentes
          </h2>
          <p className="mt-3 text-zinc-600">
            Respostas rápidas para dúvidas comuns sobre o StockFlow.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {perguntas.map((item) => (
            <div
              key={item.pergunta}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-zinc-900">
                {item.pergunta}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {item.resposta}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8">
        <div className="rounded-3xl border border-zinc-200 bg-zinc-900 px-8 py-10 text-white shadow-xl md:px-10 md:py-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Pronto para centralizar sua operação?
          </h2>

          <p className="mt-3 max-w-2xl text-zinc-300">
            Comece a usar o StockFlow para acompanhar produtos, estoque,
            movimentações, solicitações, relatórios e indicadores em um único
            sistema.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/registro"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
            >
              Criar empresa
            </Link>

            <Link
              href="/planos"
              className="rounded-2xl border border-zinc-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Ver planos
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between md:px-8">
          <p>StockFlow • Sistema de gestão de estoque</p>

          <div className="flex flex-wrap gap-4">
            <Link href="/" className="hover:text-zinc-700">
              Início
            </Link>
            <Link href="/planos" className="hover:text-zinc-700">
              Planos
            </Link>
            <Link href="/login" className="hover:text-zinc-700">
              Entrar
            </Link>
            <Link href="/registro" className="hover:text-zinc-700">
              Criar empresa
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function InfoCard({
  titulo,
  valor,
  descricao,
}: {
  titulo: string;
  valor: string;
  descricao: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <p className="text-sm text-zinc-500">{titulo}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-900">{valor}</p>
      <p className="mt-2 text-xs leading-5 text-zinc-500">{descricao}</p>
    </div>
  );
}