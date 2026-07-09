# Iconos de la Pousada Cataratas

Iconos del sitio (favicon, apple-touch-icon, iconos del web manifest).

## Qué es cada archivo

| Archivo | Tamaño | Uso |
|---|---|---|
| `../favicon.ico` | 16 / 32 / 48 | Favicon clásico (`/favicon.ico`). Está en la raíz de `public/`. |
| `icon-16.png` | 16×16 | `<link rel="icon">` |
| `icon-32.png` | 32×32 | `<link rel="icon">` |
| `icon-48.png` | 48×48 | Referencia (incluido dentro del `.ico`) |
| `icon-192.png` | 192×192 | Web manifest (Android / PWA) |
| `icon-512.png` | 512×512 | Web manifest (Android / PWA) |
| `apple-touch-icon.png` | 180×180 | iOS (pantalla de inicio) |
| `icon-source.png` | 512×512 | Master del que se derivan los demás |

Color de marca del lienzo: **#143C7A**. Se cablea en:
`app/[lang]/layout.tsx` (`metadata.icons`, `metadata.manifest`, `viewport.themeColor`)
y `public/manifest.webmanifest`.

## Cómo reemplazar por versiones de mayor resolución (sin tocar código)

El diseño actual (opción A) se generó recortando el símbolo (olas + gaviotas,
sin texto) de `public/images/pousada-logo-preto.webp`, que es pequeño (~300 px).
Cuando haya un original mejor (idealmente SVG o PNG grande, solo-símbolo):

- **Opción rápida:** reemplazar directamente los archivos de esta carpeta y
  `public/favicon.ico` manteniendo los mismos nombres y tamaños. El código no
  cambia (las rutas son fijas).
- **Opción con el generador:** editar `scripts/generate-icons.mjs`
  (constante `SRC` y, si aplica, las regiones `BIRDS` / `WAVES`) y correr:

  ```
  node scripts/generate-icons.mjs
  ```

  Regenera todos los tamaños y el `.ico` de una sola pasada.
