# 🎨 Secure Image Validator — Frontend

## 📌 Visão Geral

Interface web desenvolvida em React para interação com a API segura de autenticação e análise de imagens.

O frontend permite ao usuário realizar login seguro, configurar 2FA, gerenciar dados pessoais e analisar imagens utilizando inteligência artificial.

---

## 🧠 Objetivo

Fornecer uma interface moderna e segura para:

* Autenticação de usuários
* Gerenciamento de conta
* Envio de imagens para análise
* Controle de dados conforme LGPD

---

## 🚀 Tecnologias Utilizadas

* React
* Vite
* Tailwind CSS
* Context API

---

## 🎯 Funcionalidades

* Cadastro com consentimento LGPD
* Login com JWT
* Autenticação com 2FA
* Recuperação de senha
* Dashboard do usuário
* Upload e análise de imagem com IA
* Exportação de dados
* Revogação de consentimento
* Exclusão de conta

---

## 🔐 Segurança

* Interceptor Axios com refresh token
* Proteção de rotas autenticadas
* Tokens controlados pelo backend
* Integração com API segura

---

## 📂 Estrutura do Projeto

```
src/
 ├── components/
 ├── pages/
 ├── hooks/
 ├── services/
 ├── context/
 ├── routes/
 └── config/
```

---

## ⚙️ Configuração

Arquivo:

```
src/config/environment.js
```

Exemplo:

```js
export const environment = {
  backend: {
    url: "http://localhost:3000"
  }
}
```

---

## ▶️ Como Rodar o Frontend

### 1. Instalar dependências

```
npm install
```

### 2. Rodar aplicação

```
npm run dev
```

Aplicação disponível em:

```
http://localhost:5173
```

---

## 🔗 Integração com Backend

O frontend consome endpoints para:

* Autenticação
* 2FA
* Reset de senha
* Dados do usuário
* Análise de imagem

---

## 🔄 Fluxo de Autenticação

1. Usuário faz login
2. Backend valida credenciais
3. Se ativo, solicita 2FA
4. Recebe tokens JWT
5. Tokens armazenados
6. Axios renova automaticamente

---

## 🎨 Interface

* Tema claro/escuro
* Layout responsivo
* Feedback visual
* UX focado em segurança

---

## ⚠️ Observações

* Backend deve estar rodando
* Configurar URL corretamente
* Não expor tokens

---

## 👨‍💻 Autor

Projeto acadêmico focado em segurança da informação, autenticação forte e LGPD.
Idealizado e realizado por:

- LUIZ EDUARDO DIAS
- Guilherme Aires Pimenta de Macedo
- FABRÍCIO ROCHA DE SOUZA
- MARIANA DA ROCHA PEREIRA MOREIRA
