# Invitación digital Sofía & Luis - versión con fotos e historia

Esta versión está preparada para reemplazar el sitio publicado en GitHub Pages.

## Archivos que se deben reemplazar

Copia todo el contenido de esta carpeta dentro de la carpeta local del repositorio:

```text
index.html
style.css
script.js
assets/
README.md
actualizar_y_subir.bat
```

No es necesario volver a configurar GitHub Pages. El repositorio debe seguir publicado como:

```text
Deploy from a branch → main → / root
```

## Datos editables

Los datos principales están en `script.js`, dentro del bloque `WEDDING`.

Debes revisar especialmente:

```js
contact.whatsappNumber = 56942700723
links.googlePhotos = https://photos.app.goo.gl/wu8K3VKtTCs8gnqh7
links.spotify = playlist colaborativa Spotify configurada
bank
```

Los datos de banco, Google Photos y Spotify quedaron con placeholders para que no se publique información incompleta.

## Subir cambios a GitHub

Después de reemplazar los archivos, abre una terminal dentro de la carpeta del repositorio y ejecuta:

```bat
git add -A
git commit -m "Actualizar invitación con fotos e historia"
git push
```

También puedes ejecutar:

```bat
actualizar_y_subir.bat
```

## Notas de diseño

- Paleta dominante: navy, azul medianoche, azul empolvado, marfil y blanco papel.
- Incluye apertura tipo sobre con sello S&L.
- Incluye sección "Nuestra historia" con fotografías originales.
- Las imágenes fueron optimizadas para web mediante reducción de tamaño y compresión; no se generaron ni alteraron rostros.
- RSVP se envía por WhatsApp y no pregunta por acompañante.

## Ajuste v5
- Portada inicial devuelta al estilo anterior: sin ramos florales grandes, manteniendo solo adornos sutiles.
- Se mantienen las flores decorativas en las secciones posteriores.
- En código de vestimenta se eliminó la paleta de colores sugeridos; se conserva la restricción de blanco, marfil, beige, tonos similares y azul navy.


## Actualización v6

Se incorporaron los enlaces reales de Google Photos y Spotify, el número de confirmación +56942700723 y códigos QR para álbum colaborativo y playlist.
