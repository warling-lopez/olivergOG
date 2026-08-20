# olivergOG

Sitio de **Oliver G. (OG)** — consultoría y estrategia de negocios, Santiago RD.
Producción: `https://myprofolio.grolow.com/olivergOG/`

## Stack

Vite 8 · React 19 · TypeScript (strict) · Tailwind CSS v4 · Framer Motion · React Router 7 · lucide-react

## Comandos

```bash
npm install
cp .env.example .env.local   # rellena GA4 y el número de WhatsApp

npm run dev       # http://localhost:5173/olivergOG/
npm run build     # limpia + sitemap → tsc → vite build → prerender + robots
npm run preview   # sirve dist/ como raíz del host
npm run lint      # oxlint
npm run og        # regenera public/og/*.jpg (1200x630)
npm run icons     # regenera favicon-192/512 y apple-touch-icon desde favicon.svg
```

`build` encadena tres pasos: `prebuild` borra `dist` y regenera `sitemap.xml`
desde `config/seo.ts`, `vite build` compila a `dist/olivergOG`, y `postbuild`
prerenderiza un `index.html` por ruta.

Este proyecto **no publica `robots.txt`**: la raíz del host la comparte con el
landing de Grolow Portfolios, que es quien lo genera y declara los sitemaps de
ambos. Ver [docs/CONTRATO-HOST.md](docs/CONTRATO-HOST.md).

**Verificación en dev:** `npm run dev` debe abrir en `localhost:5173/olivergOG/`.
Si abre en `localhost:5173/` y funciona, `base` no se aplicó.

## Despliegue — Vercel

El sitio vive en `https://myprofolio.grolow.com/olivergOG/`, una subcarpeta de un
host compartido con Grolow Portfolios.

| Ajuste | Valor |
|---|---|
| `base` | `/olivergOG/` |
| `build.outDir` | `dist/olivergOG` |
| `outputDirectory` de Vercel | **`dist`** |

Publicar `dist/olivergOG` en vez de `dist` deja el sitio sin CSS ni JS: es el
error número uno de esta migración.

Paso a paso, DNS y verificación: [docs/VERCEL.md](docs/VERCEL.md).
Las reglas de convivencia con el otro proyecto: [docs/CONTRATO-HOST.md](docs/CONTRATO-HOST.md).
Antes de publicar, pasa por [docs/LANZAMIENTO.md](docs/LANZAMIENTO.md).
Las tareas de SEO local que no se programan están en [docs/SEO-LOCAL.md](docs/SEO-LOCAL.md).

## Dónde se edita cada cosa

| Necesito cambiar… | Archivo |
|---|---|
| Teléfono, WhatsApp, redes, URL del sitio | `src/config/site.ts` (o `.env.local`) |
| Títulos y descripciones de cada ruta | `src/config/seo.ts` |
| Datos estructurados (JSON-LD) | `src/config/schema.ts` |
| Copy de cualquier sección | `src/content/*.ts` |
| Colores, tipografía, utilidades | bloque `@theme` de `src/index.css` |
| Arte de las imágenes para compartir | `scripts/gen-og.mjs` |
| Reglas de despliegue y cabeceras | `vercel.json` |

Ningún componente lleva texto: todo el copy vive en `src/content/`.
Añadir un servicio = añadir un objeto a `services` en `src/content/services.ts`
y su entrada en `config/seo.ts`; la ruta, la landing, el schema y el sitemap salen solos.

## Cómo está resuelta la subcarpeta

El sitio no está en la raíz del dominio. Un solo valor manda: `base: '/olivergOG/'`
en `vite.config.ts`, que llega a la app como `import.meta.env.BASE_URL` y alimenta
el `basename` del router y el helper `asset()`. Las URLs absolutas salen de
`SITE.url`. Migrar a un dominio propio es cambiar esas dos constantes.

## Prerender

Una SPA entrega un `index.html` vacío, y WhatsApp, LinkedIn o Facebook no ejecutan
JavaScript: al compartir un enlace nunca verían los metadatos que `<Seo/>` inyecta
en runtime. `scripts/prerender.ts` escribe un `index.html` por ruta con title,
description, canonical, Open Graph, Twitter y JSON-LD ya presentes en el HTML servido.

**El cuerpo sigue hidratándose con React.** Es un prerender de metadatos, no de DOM:
resuelve el problema de compartir enlaces, no le da HTML de contenido a un rastreador
sin JS. Un prerender completo requeriría SSR o un navegador headless en el build.

## Sistema de diseño

"Corporate Night": paleta `ink` / `brand` / `gold` / `paper` / `mist` / `slateq`,
Archivo (display) + Inter (texto) + JetBrains Mono (eyebrows y datos), radios 20/12/pill,
ritmo vertical único `section-y`, y `SectionHeading` — barra azul, eyebrow, titular
bicolor y hairline — en **todas** las secciones.

Contrastes verificados contra AA: `paper` 18.8:1, `mist` 8.3–9.8:1, `brand-400`
5.1–6.1:1, `brand-500` sobre navy 4.0–4.3:1 (solo texto display), blanco sobre
`brand-500` 4.6:1. `slateq` no llega a AA dentro de las cards, así que ahí va
`.caption-card` en `mist`. El oro aparece una sola vez en la home.

## Pendientes del cliente

```bash
grep -rn TODO_CLIENTE src public scripts
```

Bio y credenciales, cifras de `results.ts`, testimonios con autorización, precios,
respuestas del FAQ, perfiles de Instagram y LinkedIn, ID de GA4,
correo y nombre legal, y las imágenes definitivas (`public/img/*.webp`; las OG de
`public/og/` son arte generado, a sustituir cuando llegue el retrato recortado).

**Los textos legales son un borrador y deben validarse con un abogado antes de publicar.**

## Desvíos respecto a los READMEs

- **Tailwind v4** en lugar de v3: no hay `tailwind.config.ts` ni `postcss.config.js`.
  Los tokens van en `@theme` dentro de `src/index.css`.
- **React 19** en lugar de 18 (lo que instala `create-vite` hoy; sin cambios de API).
- **Fuentes variables** (Archivo, Inter, JetBrains Mono), 3 woff2 latinos de ~115 KB
  en total, en lugar de 4 archivos estáticos. `Archivo Expanded` no existe en Google
  Fonts: se usa `Archivo` con `tracking` negativo, la alternativa que contempla el README 02.
- **lucide-react 1.x** ya no trae iconos de marca; Instagram y LinkedIn son SVG en
  línea en `src/components/ui/SocialIcons.tsx`.
- **Prerender propio** en vez de `vite-plugin-prerender-spa`, que arrastra Puppeteer.
  Ver la sección de prerender arriba para el alcance exacto.
- El H1 de las landings usa `display-lg`, no `display-xl`: la promesa es una frase
  completa y a 7.5 rem se rompe la lectura.
- Las `description` del README 03 medían 79–147 caracteres; la propia regla pide
  150–160. Están reescritas dentro del rango, con el mismo mensaje.
