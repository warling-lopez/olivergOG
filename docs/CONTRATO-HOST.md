# Contrato del host `myprofolio.grolow.com`

Dos proyectos independientes comparten un mismo host:

```
myprofolio.grolow.com/            → Grolow Portfolios (el servicio)
myprofolio.grolow.com/olivergOG/  → este repositorio (un cliente)
```

## Reglas

1. **Este proyecto nunca escribe fuera de `dist/olivergOG/`.** No publica
   `robots.txt`: si los dos proyectos lo escribieran, el último despliegue
   pisaría al otro.
2. **El `robots.txt` de la raíz pertenece a Grolow Portfolios.** Es el único que
   Google lee en todo el host, y declara los dos sitemaps:
   ```
   Sitemap: https://myprofolio.grolow.com/sitemap.xml
   Sitemap: https://myprofolio.grolow.com/olivergOG/sitemap.xml
   ```
   También debe mantener `Disallow: /olivergOG/gracias`.
3. **Grolow Portfolios nunca genera ni pisa `olivergOG/`.** Construye con
   `base: '/'` y, si comparte `dist`, con `emptyOutDir: false`.
4. Search Console se da de alta como **prefijo de URL**
   (`https://myprofolio.grolow.com/olivergOG/`), no como dominio: así las
   métricas de cada proyecto quedan separadas.
5. La raíz del host es del landing. Este proyecto no define ningún redirect
   desde `/`.

## Lo que este sitio necesita del servidor

Sea cual sea el hosting:

1. Servir el contenido de `dist` como raíz del host.
2. **Fallback de SPA en la subcarpeta:** cualquier `/olivergOG/*` que no sea un
   archivo real devuelve `dist/olivergOG/index.html` con estado **200**. Sin
   esto, recargar en `/olivergOG/agenda` da 404.
3. **Caché:** `assets/*` y `fonts/*` llevan hash → `max-age=31536000, immutable`;
   el HTML → `max-age=0`.

El fallback se aplica **después** de buscar el archivo estático, nunca antes: si
no, los `.js` y `.css` devuelven el HTML del index y la consola se llena de
`Unexpected token '<'`. `vercel.json` ya está configurado así; verificado en
`npm run preview`, donde todos los assets responden 200 con su content-type.
