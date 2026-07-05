# Invitación matrimonio S&L

Proyecto web estático listo para publicar en GitHub Pages.

## Estructura

```text
invitacion-matrimonio-sl/
├─ index.html
├─ style.css
├─ script.js
├─ assets/
│  ├─ logo-sl.svg
│  └─ fondo-textura.svg
├─ .github/workflows/pages.yml
├─ .gitignore
├─ .gitattributes
├─ .nojekyll
├─ subir_a_github_windows.ps1
└─ subir_a_github_manual.bat
```

## Edición rápida

La información central se cambia en el bloque `INVITACION` del archivo `script.js`.

```js
const INVITACION = {
  novia: "Sofía",
  novio: "Luis",
  fechaISO: "2026-10-10T17:00:00-03:00",
  fechaTexto: "10 de octubre de 2026 · 17:00 hrs",
  ceremoniaNombre: "Iglesia Cerro Blanco",
  ceremoniaDireccion: "Til Til, Región Metropolitana",
  whatsappNumero: "56900000000"
};
```

## Subida automática recomendada

Requisitos:

- Git instalado.
- GitHub CLI instalado: https://cli.github.com/
- Cuenta GitHub: `luis-hume`.

En PowerShell, dentro de esta carpeta:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\subir_a_github_windows.ps1
```

El script crea o reutiliza el repositorio `invitacion-matrimonio-sl`, sube los archivos y deja el sitio preparado para GitHub Pages.

## Subida manual

Si no usas GitHub CLI, crea primero un repositorio público en GitHub con el nombre:

```text
invitacion-matrimonio-sl
```

Luego ejecuta:

```bat
subir_a_github_manual.bat
```

## URL esperada

```text
https://luis-hume.github.io/invitacion-matrimonio-sl/
```

Puede tardar unos minutos en activarse después del primer push.
