https://stockflow-cyan.vercel.app)

# 🚀 StockFlow

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

### 2️⃣ Instalar dependências

npm install

### 3️⃣ Configurar variáveis de ambiente

Criar arquivo `.env`

DATABASE_URL=“postgresql://…”

NEXT_PUBLIC_APP_URL=“http://localhost:3000”

### 4️⃣ Rodar migrations

npx prisma migrate dev

### 5️⃣ Iniciar servidor

npm run dev

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


