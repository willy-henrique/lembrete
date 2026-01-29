<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copie [.env-teste.example](.env-teste.example) para `.env-teste` (ou `.env.local`), preencha as variáveis e use no app.
3. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
4. Run the app:
   `npm run dev`

## Env de teste

Use `.env-teste` para Firebase e Cloudinary. Nunca commitar esse arquivo. Template: [.env-teste.example](.env-teste.example). Defina `VITE_CLOUDINARY_CLOUD_NAME` no [console Cloudinary](https://console.cloudinary.com).

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
