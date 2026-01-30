@echo off
cd /d "%~dp0"
del /f /q ".git\config.lock" 2>nul
git status >nul 2>&1 || git init
git add .
git diff --staged --quiet 2>nul || git commit -m "update"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/willy-henrique/lembrete.git
git push -u origin main
