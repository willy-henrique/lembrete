<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js

1. `npm install` (instala Tailwind, PostCSS, Firebase, etc.)
2. Copie [.env-teste.example](.env-teste.example) para **`.env.local`**, preencha as variáveis `VITE_FIREBASE_*` (e as demais se usar). O Vite carrega `.env` e `.env.local`.
3. `npm run dev`

Tailwind usa PostCSS (não CDN). CSS em [index.css](index.css).

Os **dados são reais** no Firestore (coleção `employees`). Excluir **um por um** (ícone lixeira na lista) ou **todos** (botão “Excluir todos os cadastros” no resumo).

## Dados

- **Aniversário:** apenas **dia** e **mês** (1–31 e 1–12). Sem ano.
- Cadastro em [EmployeeModal](components/EmployeeModal.tsx): selects “Dia” e “Mês”. Dados em [types](types.ts) como `birthDay` e `birthMonth`.

## Firebase (Firestore)

- Dados reais na coleção `employees`. Campos: `id`, `name`, `birthDay`, `birthMonth`, `unit`, `position`, `phone`, `photoUrl`.
- Regras em [firestore.rules](firestore.rules) e [FIREBASE-RULES.md](FIREBASE-RULES.md). Índice em [firestore.indexes.json](firestore.indexes.json) (ordenação por `name`).
- Deploy: `firebase deploy --only firestore:rules` e `firebase deploy --only firestore:indexes` se usar os índices.

**"Missing or insufficient permissions"** → Publique as regras no Console (Firestore → Regras) ou rode `firebase deploy --only firestore:rules`. O [firestore.rules](firestore.rules) atual permite leitura/escrita sem login (`allow read, write: if true`).

## Env

Use `.env.local` ou `.env` para Firebase (e Cloudinary/Gemini se usar). Template: [.env-teste.example](.env-teste.example). Nunca commitar arquivos de env.

## Preparar para subir no GitHub

- [ ] Nunca commitar `.env`, `.env-teste`, `.env.local` nem JSON do Firebase Admin (já estão no `.gitignore`).
- [ ] Copiar `.env-teste.example` → `.env-teste` e preencher variáveis apenas na sua máquina.
- [ ] Repositório remoto: `https://github.com/willy-henrique/lembrete.git`.
- [ ] Antes do push: conferir `git status` — não deve listar `.env*`, `node_modules` nem `*firebase*adminsdk*.json`.
- [ ] Rodar [push-github.bat](push-github.bat) (duplo clique) ou os comandos abaixo.

## Subir para o GitHub

**Opção 1:** Dar duplo clique em `push-github.bat` (ou rodar no terminal). O script remove `config.lock`, faz init/add/commit/remote/push.

**Opção 2 — Repo novo (linha de comando):**

```bash
echo "# lembrete" >> README.md
git init
git add README.md
git commit -m "primeiro commit"
git branch -M main
git remote add origin https://github.com/willy-henrique/lembrete.git
git push -u origin main
```

*(Use `git add .` em vez de `git add README.md` para enviar o projeto inteiro.)*

**Opção 3 — Repo existente:**

```bash
git remote add origin https://github.com/willy-henrique/lembrete.git
git branch -M main
git push -u origin main
```
