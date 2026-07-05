@echo off
setlocal
set GITHUB_USER=luis-hume
set DEFAULT_REPO=invitacion-matrimonio-sl

set /p REPO_NAME=Nombre del repositorio [%DEFAULT_REPO%]: 
if "%REPO_NAME%"=="" set REPO_NAME=%DEFAULT_REPO%

cd /d "%~dp0"

git --version >nul 2>nul
if errorlevel 1 (
  echo Git no esta instalado o no esta en PATH.
  echo Instala Git desde https://git-scm.com/downloads
  pause
  exit /b 1
)

git init
git branch -M main
git add .
git commit -m "Primera version de la invitacion web"

git remote get-url origin >nul 2>nul
if errorlevel 1 (
  git remote add origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git
) else (
  git remote set-url origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git
)

git push -u origin main

echo.
echo Listo. URL esperada:
echo https://%GITHUB_USER%.github.io/%REPO_NAME%/
echo.
echo Si falla el push, crea antes el repositorio publico en GitHub con ese mismo nombre.
pause
