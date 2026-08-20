# SEO local — tareas fuera del código

Esto no se programa: lo ejecuta Oliver, y pesa tanto como el sitio.

1. **Google Business Profile** — crear y verificar el perfil. Categoría principal:
   "Consultor de negocios". Ciudad: Santiago de los Caballeros, RD.
2. **NAP idéntico en todas partes** — mismo nombre, mismo teléfono escrito igual
   (`829 884 7499`) y misma ciudad en el sitio, en Google Business y en cada red
   social. Cualquier variación diluye la señal.
3. **Enlaces desde las biografías** de Instagram y LinkedIn, con seguimiento:
   `https://myprofolio.grolow.com/olivergOG/?utm_source=instagram&utm_medium=bio`
4. **Google Search Console** — dar de alta la propiedad por prefijo de URL
   (`https://myprofolio.grolow.com/olivergOG/`) y enviar el sitemap.
5. **Reseñas en Google** — pedirlas a los primeros clientes. Para un servicio
   local es la señal de confianza más pesada que existe.

## Nota estratégica: el techo de un subdirectorio

El sitio vive en un subdirectorio de un dominio ajeno, así que nunca acumulará
autoridad de dominio propia: hereda (y compite con) la de `myprofolio.grolow.com`.

La recomendación es registrar un dominio propio (`olivergonzalez.do` o similar) y
migrar con redirecciones 301 cuando esté listo. **El código ya está preparado
para eso:** todas las URLs salen de `SITE.url` en `src/config/site.ts`, o de
`VITE_SITE_URL`. Migrar es cambiar esa constante, ajustar `base` en
`vite.config.ts` y `.htaccess`, y volver a construir.
