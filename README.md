# FlowPedidos — Frontend

Interface web do sistema FlowPedidos, construída com React, Vite e Tailwind CSS.

**Stack:** React · Vite · Tailwind CSS · React Router · Recharts

---

## Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Rodando Localmente](#rodando-localmente)
- [Páginas e Rotas](#páginas-e-rotas)
- [Autenticação no Frontend](#autenticação-no-frontend)
- [Comunicação com a API](#comunicação-com-a-api)
- [Build para Produção](#build-para-produção)
- [Deploy](#deploy)

---

## Visão Geral

O frontend do FlowPedidos é uma SPA (Single Page Application) que oferece:

- Página institucional com apresentação do produto e da equipe
- Tela de login e cadastro de usuários
- Dashboard protegido com visão geral, pedidos, estoque, status e histórico de auditoria
- Comunicação com a API REST do backend via `fetch`
- Proteção de rotas para usuários não autenticados

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19 | Biblioteca de UI |
| Vite | 7 | Bundler e servidor de desenvolvimento |
| React Router DOM | 7 | Roteamento da SPA |
| Tailwind CSS | 4 | Estilização utilitária |
| Recharts | 3 | Gráficos e visualizações |
| Supabase JS | 2 | Acesso direto ao banco (storage/db.js) |

---

## Estrutura de Pastas
```
flowpedidos-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── auth/
│   │   ├── AuthContext.jsx     # Context global (token, user, login, logout)
│   │   └── ProtectedRoute.jsx  # Redireciona usuários não autenticados
│   ├── components/
│   │   ├── Card.jsx
│   │   ├── Layout.jsx          # Layout base do dashboard
│   │   ├── Modal.jsx
│   │   ├── Sidebar.jsx
│   │   └── Table.jsx
│   ├── pages/
│   │   ├── Auth.jsx            # Login e cadastro
│   │   ├── Home.jsx            # Landing page
│   │   ├── WhoWeAre.jsx        # Quem Somos
│   │   └── Dashboard/
│   │       ├── Overview.jsx    # Métricas e gráficos
│   │       ├── Orders.jsx      # Gerenciamento de pedidos
│   │       ├── Inventory.jsx   # Controle de estoque
│   │       ├── Status.jsx      # Status dos pedidos
│   │       └── History.jsx     # Histórico de auditoria
│   ├── services/
│   │   ├── apiClient.js        # Função base apiFetch com autenticação
│   │   ├── authService.js
│   │   ├── productService.js
│   │   ├── orderService.js
│   │   ├── memberService.js
│   │   ├── dashboardService.js
│   │   └── auditService.js
│   ├── storage/
│   │   └── db.js               # Client Supabase para o frontend
│   ├── styles/
│   │   └── responsive.css
│   ├── App.jsx                 # Definição de rotas
│   └── main.jsx                # Ponto de entrada
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Pré-requisitos

- Node.js 20 ou superior
- Backend do FlowPedidos rodando (local ou em produção)

---

## Instalação
```bash
git clone https://github.com/seu-usuario/flowpedidos-frontend.git
cd flowpedidos-frontend
npm install
```

---

## Variáveis de Ambiente
```bash
cp .env.example .env
```

| Variável | Obrigatória | Descrição |
|---|---|---|
| `VITE_API_BASE_URL` | Produção | URL base da API backend |

> Em desenvolvimento, o Vite faz proxy automático de `/api` para `http://127.0.0.1:3000` (configurado em `vite.config.js`). Em produção, configure `VITE_API_BASE_URL` com a URL do backend deployado.

---

## Rodando Localmente

Certifique-se de que o backend também está rodando em `http://localhost:3000`.
```bash
npm run dev
```

App disponível em `http://localhost:5173`.

---

## Páginas e Rotas

| Rota | Componente | Acesso | Descrição |
|---|---|---|---|
| `/` | `Home.jsx` | Público | Landing page |
| `/login` | `Auth.jsx` | Público | Login e cadastro |
| `/quem-somos` | `WhoWeAre.jsx` | Público | Página da equipe |
| `/dashboard` | `Overview.jsx` | Autenticado | Métricas e gráficos |
| `/dashboard/pedidos` | `Orders.jsx` | Autenticado | CRUD de pedidos |
| `/dashboard/estoque` | `Inventory.jsx` | Autenticado | CRUD de produtos |
| `/dashboard/status` | `Status.jsx` | Autenticado | Status dos pedidos |
| `/dashboard/historico` | `History.jsx` | Autenticado | Log de auditoria |
| `*` | — | — | Redireciona para `/` |

Rotas dentro de `/dashboard` são protegidas pelo `ProtectedRoute`.

---

## Autenticação no Frontend

Gerenciada pelo `AuthContext` (`src/auth/AuthContext.jsx`), disponível via `useAuth()`:

| Valor / Função | Tipo | Descrição |
|---|---|---|
| `user` | objeto | Dados do usuário logado (`id`, `name`, `email`, `role`) |
| `token` | string | JWT armazenado no `localStorage` |
| `isAuthenticated` | boolean | `true` se houver token |
| `loading` | boolean | `true` durante requisições de auth |
| `login(email, senha)` | função | Autentica e salva token e usuário |
| `register(payload)` | função | Cadastra e já autentica |
| `logout()` | função | Limpa estado e `localStorage` |
```jsx
import { useAuth } from '../auth/AuthContext';

const { user, isAuthenticated, logout } = useAuth();
```

---

## Comunicação com a API

Toda comunicação passa pela função `apiFetch` em `src/services/apiClient.js`, que:

- Adiciona automaticamente o header `Authorization: Bearer <token>`
- Lê o token do `localStorage`
- Lança erros com mensagens legíveis em respostas não-OK

Cada recurso tem seu próprio service:

| Arquivo | Responsabilidade |
|---|---|
| `authService.js` | login, register |
| `productService.js` | CRUD de produtos |
| `orderService.js` | CRUD de pedidos |
| `memberService.js` | CRUD de membros |
| `dashboardService.js` | Estatísticas |
| `auditService.js` | Histórico de auditoria |

---

## Build para Produção
```bash
npm run build
```

Arquivos gerados na pasta `dist/`, prontos para qualquer hosting estático.
```bash
npm run preview  # pré-visualizar o build localmente
```

---

## Deploy

**Vercel:**
1. Conecte o repositório na [Vercel](https://vercel.com/)
2. Configure a variável `VITE_API_BASE_URL` com a URL do backend
3. Deploy automático a cada push na branch `main`

**Netlify:**
1. Conecte o repositório no [Netlify](https://netlify.com/)
2. Build command: `npm run build` · Publish directory: `dist`
3. Adicione a variável `VITE_API_BASE_URL` nas configurações do site
