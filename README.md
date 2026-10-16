# StockFlow

**Demo:** https://stockflow-cyan.vercel.app

StockFlow é um sistema SaaS de gestão de estoque desenvolvido para ajudar empresas a organizar produtos, movimentações e usuários em um ambiente multiempresa.

O projeto foi construído com foco em arquitetura real de produto, incluindo autenticação, controle de acesso, gestão de usuários e estrutura preparada para escalabilidade.

---

# 📦 Funcionalidades

### 🔐 Autenticação e segurança
- login com controle de sessão
- redefinição de senha
- convites de usuários via token
- controle de acesso por perfil (admin, user, superadmin)

### 🏢 Multiempresa (SaaS)
- estrutura multi-tenant
- empresas isoladas por `empresaId`
- sistema de convites para entrada de novos usuários

### 👥 Gestão de usuários
- criação de usuários
- envio de convites
- redefinição de senha
- controle de permissões

### 📊 Dashboard
- painel administrativo
- visão inicial de métricas operacionais
- estrutura preparada para relatórios e analytics

### 📦 Gestão de estoque
- cadastro de produtos
- movimentações de entrada e saída
- estrutura preparada para relatórios

### 💳 Controle de planos
- plano **Free**
- plano **Pro**
- plano **Enterprise**
- limite de usuários por plano

### 🛡 Proteções implementadas
- validação de CPF/CNPJ
- bloqueio de emails descartáveis
- limite de usuários por plano
- proteção de rotas por sessão
- validação de assinatura ativa

---

# 🧠 Arquitetura

O projeto segue uma estrutura organizada utilizando o **Next.js App Router**.

app
├ api
│ ├ auth
│ ├ usuarios
│ ├ convites
│ └ admin

├ dashboard
├ produtos
├ usuarios
├ fornecedores
├ movimentacoes
├ relatorios

lib
├ prisma
├ session
├ plan-limits
├ documento

Cada empresa possui isolamento lógico através do campo:

empresaId

Isso permite que o sistema funcione como **SaaS multiempresa**.

---

# ⚙️ Tecnologias utilizadas

- **Next.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Node.js**
- **TailwindCSS**

---

# 🗄 Banco de dados

O projeto utiliza **PostgreSQL** com **Prisma ORM** para modelagem e acesso aos dados.

Principais entidades:

- Empresa
- User
- Assinatura
- UserInvite
- Produto
- Movimentação

---

# 🔐 Sistema de permissões

Perfis disponíveis:

| Perfil | Permissões |
|------|------|
| superadmin | gerencia empresas |
| admin | gerencia usuários e estoque |
| user | acesso operacional |

---

# 🚀 Como rodar o projeto

### 1️⃣ Clonar repositório

git clone https://github.com/7Genesis/stockflow

### 2️⃣ Configurar variáveis de ambiente

Criar arquivo `.env`

DATABASE_URL=“postgresql://…”

NEXT_PUBLIC_APP_URL=“http://localhost:3000”

SESSION_SECRET=“um-segredo-longo-e-aleatorio”

O `SESSION_SECRET` assina o cookie de sessão (HMAC-SHA256). É **obrigatório em produção** (sem ele o login falha); em desenvolvimento e nos testes há um valor padrão. Gere um com `openssl rand -hex 32`. Trocar o segredo desloga todo mundo.

### 3️⃣ Instalar dependências

npm install

O `postinstall` roda `prisma generate`, que exige `DATABASE_URL` definida (no `.env` ou no ambiente). Sem ela o `npm install` termina com erro.

### 4️⃣ Criar as tabelas

npx prisma migrate deploy

> O histórico de migrations em `prisma/migrations` é PostgreSQL (baseline `20261016000000_init_postgres`). **Se você já tem um banco criado antes** (com as tabelas existentes), não rode o `deploy` direto: marque o baseline como aplicado com `npx prisma migrate resolve --applied 20261016000000_init_postgres`. Para mudar o schema, use `npx prisma migrate dev --name descricao`.

### 5️⃣ Iniciar servidor

npm run dev

---

# ✅ Como rodar os testes

Os testes usam [Vitest](https://vitest.dev) e um **PostgreSQL de verdade** (as rotas de API são chamadas direto, com a sessão simulada).

```bash
# 1. um Postgres descartável (ou use o seu e crie o banco stockflow_test)
docker run -d --rm --name stockflow-pg-test -p 5432:5432 \
  -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=stockflow_test postgres:16

# 2. instalar (o postinstall precisa de DATABASE_URL) e rodar a suíte
export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/stockflow_test
npm install
npm test
```

- Sem `TEST_DATABASE_URL`, os testes usam `postgresql://postgres:postgres@localhost:5432/stockflow_test`.
- Antes da suíte, o schema `public` do banco de teste é **apagado e recriado** e as migrations são aplicadas com `prisma migrate deploy`. Por segurança, o nome do banco precisa terminar em `_test`; qualquer outro nome faz a suíte abortar.
- O que está coberto: movimentação de estoque (entrada, saída, estoque insuficiente, isolamento por empresa), fluxo de solicitação (criar, aprovar com baixa de estoque, recusar, cancelar, permissões de admin e dono, estado já resolvido), registro de empresa (validação de CPF/CNPJ, e-mail descartável, duplicidade, assinatura de teste de 7 dias) e funções puras de `lib/` (documento, limites de plano, e-mail descartável).
- Não há testes de componentes React nem de ponta a ponta no navegador, e as rotas de NF-e, fornecedores, relatórios e convites ainda não têm testes.

O workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) roda `npm ci`, `npm run lint`, `npm run build` e `npm test` (com um serviço PostgreSQL) a cada push na `main` e a cada pull request. O lint tem avisos, mas nenhum erro.

---

# 🌐 Deploy

O projeto pode ser publicado facilmente utilizando:

- **Vercel**
- **Supabase / PostgreSQL**
- **Prisma**

---

# 📈 Objetivo do projeto

Este projeto foi desenvolvido com foco em:

- evolução técnica em **full stack development**
- construção de **aplicações SaaS**
- prática de arquitetura e regras de negócio reais

---

# 👨‍💻 Autor

**Genesis**

Desenvolvedor focado em backend, full stack e arquitetura de aplicações.

---

# 📄 Licença

Este projeto está sob licença MIT.


