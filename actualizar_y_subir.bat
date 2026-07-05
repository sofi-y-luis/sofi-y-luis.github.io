@echo off
REM Ejecutar este archivo desde la carpeta del repositorio local.
REM Elimina el workflow antiguo si existe, agrega los cambios y sube a GitHub.

IF EXIST ".github\workflows\pages.yml" (
  del ".github\workflows\pages.yml"
)

git status
git add -A
git commit -m "Redisenar invitacion web"
git push

pause
