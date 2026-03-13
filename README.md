# FlowPedidos — Frontend

Interface web construída com **React + Vite + Tailwind CSS**.

## Pré-requisitos

- Node.js 20+

## Instalação

```bash
npm install
```

## Configuração

Copie o arquivo de exemplo e preencha as variáveis:

```bash
cp .env.example .env
```

| Variável           | Descrição                            |
|--------------------|--------------------------------------|
| `VITE_API_BASE_URL`| URL da API backend (sem barra final) |

## Rodando localmente

```bash
npm run dev
```

O app ficará disponível em `http://localhost:5173`.

> Em desenvolvimento, o Vite faz proxy de `/api` para `http://127.0.0.1:3000` automaticamente (configurado em `vite.config.js`), então o backend precisa estar rodando localmente também.

## Build para produção

```bash
npm run build
```

Os arquivos gerados ficam na pasta `dist/` e podem ser servidos por qualquer hosting estático (Vercel, Netlify, etc.).

## Deploy (Vercel / Netlify)

Configure a variável de ambiente `VITE_API_BASE_URL` apontando para a URL do backend em produção antes de fazer o build.
