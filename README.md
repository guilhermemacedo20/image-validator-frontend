# Secure Image Validator — Frontend

Interface web em React para autenticação segura e análise de imagens com IA (PFC de Engenharia de Software).

Arquitetura: **Layered Architecture** — detalhes em [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## Objetivo

Fornecer uma interface simples e segura para:

- autenticação de usuários (JWT + 2FA);
- gerenciamento de conta e direitos LGPD;
- upload e análise de imagens via backend.

## Tecnologias

- React 19 + TypeScript
- Vite
- React Router
- Tailwind CSS
- Axios
- Context API (somente autenticação)
- Vitest + Testing Library

## Arquitetura em camadas

```
src/
├── app/               # Composição (bootstrap + rotas)
├── presentation/      # UI: pages, components, context, hooks
├── domain/            # Tipos e contratos do domínio
├── infrastructure/    # HTTP, services, config, utils
└── assets/            # Logos e estáticos
```

## Funcionalidades

- Cadastro com consentimento LGPD
- Login com JWT e 2FA
- Recuperação de senha
- Upload e análise de imagem com IA
- Exportação de dados, revogação de consentimento e exclusão de conta

## Configuração

Arquivo: `src/infrastructure/config/environment.ts`

```env
VITE_BACKEND_URL=http://localhost:3000/api
```

Sem a variável, em `localhost` o default é `http://localhost:3000/api`.

## Como rodar

```bash
npm install
npm run dev
```

Aplicação em `http://localhost:5173`.

Scripts: `npm run build`, `npm run test`, `npm run lint`.

## Autores

- LUIZ EDUARDO DIAS
- Guilherme Aires Pimenta de Macedo
- FABRÍCIO ROCHA DE SOUZA
- MARIANA DA ROCHA PEREIRA MOREIRA
