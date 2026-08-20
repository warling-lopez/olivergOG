# Despliegue en Vercel

## Cómo encaja la subcarpeta

Vite prefija todos los assets con `/olivergOG/`. Para que esas rutas existan en el
servidor, los archivos tienen que quedar **físicamente** dentro de una carpeta
`olivergOG/`. De ahí las dos piezas que parecen contradecirse pero no lo son:

| Ajuste | Valor |
|---|---|
| `base` (vite.config.ts) | `/olivergOG/` |
| `build.outDir` | `dist/olivergOG` |
| `outputDirectory` (vercel.json) | **`dist`** |

Publicar `dist/olivergOG` en vez de `dist` es el error clásico: el HTML carga y
todo el CSS y el JS dan 404. Si ves el sitio sin estilos, es esto.

## Pasos en el panel

1. **Import Project** → conecta el repositorio.
2. Framework Preset: **Other** — no "Vite", para que respete `vercel.json`.
3. Build Command `npm run build` · Output Directory `dist`.
4. **Environment Variables**, en Production, Preview y Development:
   ```
   VITE_SITE_URL=https://myprofolio.grolow.com/olivergOG
   VITE_GA4_ID=G-XXXXXXXXXX
   VITE_CALENDLY_URL=…
   VITE_FORM_ENDPOINT=…
   VITE_WHATSAPP=18298847499
   ```
   Las `VITE_*` se incrustan en el bundle y son públicas. Nunca metas ahí un secreto.
5. **Settings → Domains** → `myprofolio.grolow.com`.
6. En el DNS de `grolow.com`:
   ```
   Tipo: CNAME · Nombre: myprofolio · Valor: cname.vercel-dns.com · TTL: auto
   ```
   Copia el valor exacto que muestre el panel: cambia según cuenta y región.
7. Espera propagación y emisión del certificado. Debe quedar en **Valid Configuration**.

## Verificación post-deploy

```bash
curl -sI https://myprofolio.grolow.com/olivergOG/ | head -3
curl -sI https://myprofolio.grolow.com/olivergOG/agenda | head -3        # 200, no 404
curl -s  https://myprofolio.grolow.com/olivergOG/servicios/mentoria-empresarial | grep -i '<title>\|og:title'
curl -s  https://myprofolio.grolow.com/robots.txt
```

## Detalles que importan

- **El redirect de `/` a `/olivergOG` es 307 (temporal), a propósito.** Ponerlo
  permanente el primer día lo cachean los navegadores para siempre y bloquea el
  subdominio para otros portafolios. Cuando la raíz pase a ser Grolow Portfolios,
  ese redirect se elimina.
- Los `rewrites` de Vercel se evalúan **después** de buscar el archivo estático,
  así que `/olivergOG/assets/index-abc.js` se sirve directo y no cae en el
  fallback de la SPA. Es el comportamiento correcto.
- Con `cleanUrls: true`, `/olivergOG/agenda` sirve `agenda/index.html`
  prerenderizado **antes** de llegar al rewrite. El bot recibe los meta tags
  reales y el usuario recibe la SPA hidratada.
- `robots.txt` en la raíz del host es **compartido** con Grolow Portfolios y con
  cualquier otro proyecto del subdominio. `scripts/post-build.ts` solo lo escribe
  si no existe. Ver `docs/CONTRATO-HOST.md`.
