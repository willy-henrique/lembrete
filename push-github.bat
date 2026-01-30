@echo off
cd /d "%~dp0"

echo.
echo === Push Lembrete - GitHub ===
echo.

echo [1/6] config.lock...
if exist ".git\config.lock" (
    del /f /q ".git\config.lock" 2>nul
    if exist ".git\config.lock" (echo      Fail. Close Cursor and retry.) else (echo      Done.)
) else (
    echo      None.
)

echo.
echo [2/6] Init...
git status >nul 2>&1
if errorlevel 1 (
    git init
    set PRIMEIRO=1
    echo      Created.
) else (
    set PRIMEIRO=0
    echo      Ok.
)

echo.
echo [3/6] Add...
git add .
git status --short
echo.

echo [4/6] Commit...
git diff --staged --quiet 2>nul
if errorlevel 1 goto docommit
echo      Nothing to commit.
goto aftercommit
:docommit
if "%PRIMEIRO%"=="1" (
    git commit -m "primeiro commit"
    echo      primeiro commit
) else (
    git commit -m "update"
    echo      update
)
:aftercommit

echo.
echo [5/6] Branch and remote...
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/willy-henrique/lembrete.git
echo      Ok.

echo.
echo [6/6] Push...
git push -u origin main
set PUSHERR=%errorlevel%

echo.
if %PUSHERR% neq 0 goto pusherr
echo *** Push OK! ***
goto end
:pusherr
echo ERROR. Check: repo exists, git login, token or SSH.
:end
echo.
pause
