# Checklist de lanzamiento

Marca cada punto contra el sitio ya subido a `https://myprofolio.grolow.com/olivergOG/`.

## Antes de subir

- [ ] `grep -rn TODO_CLIENTE src public scripts` → cero resultados.
- [ ] `.env.local` creado con `VITE_GA4_ID` y `VITE_WHATSAPP` reales.
- [ ] `npm run og` y `npm run icons` reejecutados si cambió el arte.
- [ ] `npm run build` sin errores; `npm run preview` revisado.

## Técnico

- [ ] Todas las rutas cargan con recarga directa (F5) y con enlace directo.
- [ ] Ningún 404 en assets (pestaña Network filtrando por estado).
- [ ] HTTPS activo y sin contenido mixto.
- [ ] `.htaccess` presente en el servidor — muchos clientes FTP ocultan los archivos con punto.

## SEO

- [ ] `title` y `description` únicos en las 7 rutas indexables.
- [ ] Canonical correcto en cada ruta, con el segmento `/olivergOG`.
- [ ] `curl https://…/olivergOG/servicios/mentoria-empresarial | grep '<title>'` devuelve el título de la landing (confirma el prerender en producción).
- [ ] JSON-LD sin errores en Rich Results Test y en validator.schema.org.
- [ ] `sitemap.xml` accesible y enviado a Search Console.
- [ ] El `robots.txt` de la **raíz del dominio** no bloquea `/olivergOG/` — coordinar con quien administre `myprofolio.grolow.com`.

## Social

- [ ] Vista previa correcta en WhatsApp (compártelo contigo mismo primero: WhatsApp cachea con fuerza), LinkedIn Post Inspector y el debugger de Facebook.
- [ ] La imagen OG se lee en miniatura.

## Conversión

- [ ] "Agenda tu cita" funciona desde navbar, hero, cada tarjeta de servicio, sticky móvil y cierre.
- [ ] WhatsApp abre con el mensaje pre-escrito correcto en móvil y en escritorio.
- [ ] El formulario de `/agenda` abre WhatsApp con el mensaje armado y redirige a `/gracias`.
- [ ] «Prefiero escribir directo» abre WhatsApp sin pasar por el formulario.
- [ ] Las tildes, la `ñ` y los signos `¿ ¡` llegan bien al chat, en móvil y en WhatsApp Web.
- [ ] Todos los eventos aparecen en el DebugView de GA4.
- [ ] `whatsapp_send` marcado como conversión en GA4.

## Calidad

- [ ] Lighthouse móvil: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100.
- [ ] Probado en Chrome Android, Safari iOS, Chrome y Safari de escritorio.
- [ ] Sin errores en consola.
- [ ] Ortografía y tildes revisadas.
