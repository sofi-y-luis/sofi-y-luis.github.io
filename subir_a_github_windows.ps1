# Script para crear/subir el repositorio a GitHub desde Windows PowerShell.
# Requiere Git y GitHub CLI (gh): https://cli.github.com/

$ErrorActionPreference = "Stop"
$GithubUser = "luis-hume"
$DefaultRepo = "invitacion-matrimonio-sl"

Write-Host "Repositorio GitHub para publicar invitación web" -ForegroundColor Cyan
$RepoName = Read-Host "Nombre del repositorio [$DefaultRepo]"
if ([string]::IsNullOrWhiteSpace($RepoName)) { $RepoName = $DefaultRepo }

function Test-Command($Command) {
  $null -ne (Get-Command $Command -ErrorAction SilentlyContinue)
}

if (-not (Test-Command git)) {
  throw "Git no está instalado o no está en PATH. Instala Git desde https://git-scm.com/downloads"
}

if (-not (Test-Command gh)) {
  throw "GitHub CLI no está instalado o no está en PATH. Instálalo desde https://cli.github.com/"
}

Set-Location $PSScriptRoot

if (-not (Test-Path ".git")) {
  git init
}

git branch -M main
git add .

try {
  git diff --cached --quiet
  Write-Host "No hay cambios nuevos para guardar en commit." -ForegroundColor Yellow
} catch {
  git commit -m "Primera versión de la invitación web"
}

try {
  gh auth status | Out-Null
} catch {
  Write-Host "Iniciando sesión en GitHub..." -ForegroundColor Yellow
  gh auth login
}

$FullRepo = "$GithubUser/$RepoName"
$RepoExists = $true
try {
  gh repo view $FullRepo | Out-Null
} catch {
  $RepoExists = $false
}

if (-not $RepoExists) {
  Write-Host "Creando repositorio remoto $FullRepo..." -ForegroundColor Cyan
  gh repo create $FullRepo --public --source=. --remote=origin
} else {
  Write-Host "El repositorio $FullRepo ya existe. Se reutilizará." -ForegroundColor Yellow
  $RemoteUrl = "https://github.com/$FullRepo.git"
  $ExistingRemote = git remote 2>$null
  if ($ExistingRemote -contains "origin") {
    git remote set-url origin $RemoteUrl
  } else {
    git remote add origin $RemoteUrl
  }
}

Write-Host "Subiendo archivos a GitHub..." -ForegroundColor Cyan
git push -u origin main

Write-Host ""
Write-Host "Listo. Repositorio:" -ForegroundColor Green
Write-Host "https://github.com/$FullRepo"
Write-Host ""
Write-Host "URL esperada de GitHub Pages:" -ForegroundColor Green
Write-Host "https://$GithubUser.github.io/$RepoName/"
Write-Host ""
Write-Host "Si la página no aparece de inmediato, espera unos minutos y revisa Actions > Publicar sitio estático en GitHub Pages."
