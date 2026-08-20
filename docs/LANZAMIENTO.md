# Checklist de lanzamiento

Contra el sitio ya publicado en `https://myprofolio.grolow.com/olivergOG/`.

## Antes de subir

- [ ] `grep -rn TODO_CLIENTE src public scripts` → cero resultados.
- [ ] `.env.local` con `VITE_GA4_ID` y `VITE_WHATSAPP` reales.
- [ ] `npm run og` y `npm run icons` reejecutados si cambió el arte.
- [ ] `npm run build` sin errores.
- [ ] Checklist del README 04 aprobado.

## Técnico

- [ ] Todas las rutas cargan con recarga directa (F5) y con enlace directo.
- [ ] Ningún 404 en assets (Network filtrando por estado).
- [ ] HTTPS activo y sin contenido mixto.
- [ ] El servidor sirve el HTML prerenderizado **antes** del fallback de SPA.
      Ojo: `npm run preview` no lo hace — hace fallback primero. Para validar el
      prerender en local, sirve `dist` con cualquier servidor estático normal.

## SEO

- [ ] `title` y `description` únicos y dentro del límite en las 7 rutas.
- [ ] Canonical correcto en cada ruta, con el segmento `/olivergOG`.
- [ ] `curl https://…/olivergOG/servicios/mentoria-empresarial | grep '<title>'`
      devuelve el título de la landing.
- [ ] JSON-LD sin errores en Rich Results Test y en validator.schema.org.
- [ ] `sitemap.xml` accesible y enviado a Search Console (prefijo de URL).
- [ ] El `robots.txt` de la **raíz del host** no bloquea `/olivergOG/`. Lo genera
      el proyecto de Grolow Portfolios; este sitio no lo publica.
- [ ] Un solo `<h1>` por página; jerarquía de encabezados correcta.
- [ ] Todas las imágenes con `alt` en español (las decorativas, `alt=""` + `aria-hidden`).

## Social

- [ ] Vista previa correcta en WhatsApp, LinkedIn Post Inspector y el debugger de Facebook.
- [ ] La imagen OG se lee en miniatura.
- [ ] Compártelo contigo mismo en WhatsApp **primero**: cachea con fuerza y
      corregirlo después no refresca la miniatura enseguida.

## Conversión

- [ ] "Agenda tu cita" funciona desde navbar, hero, cada tarjeta de servicio,
      sticky móvil y cierre.
- [ ] El formulario de `/agenda` arma el mensaje correcto y abre WhatsApp, en
      móvil y en escritorio.
- [ ] "Prefiero escribir directo" abre WhatsApp sin pasar por el formulario.
- [ ] Los mensajes por contexto son los correctos: home, landing de cada servicio
      y cierre llevan su propio texto pre-escrito.
- [ ] Tildes, `ñ` y signos `¿ ¡` llegan bien al chat, en móvil y en WhatsApp Web.
- [ ] Los 9 eventos aparecen en el DebugView de GA4.
- [ ] **`whatsapp_send` marcado como conversión en GA4.**

## Calidad

- [ ] Lighthouse móvil: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100.
- [ ] Probado en Chrome Android, Safari iOS, Chrome y Safari de escritorio.
- [ ] Sin errores en consola.
- [ ] Ortografía y tildes revisadas.
