# Contrato del host `myprofolio.grolow.com`

Dos proyectos independientes comparten un mismo host:

```
myprofolio.grolow.com/            → Grolow Portfolios (el servicio)
myprofolio.grolow.com/olivergOG/  → este repositorio (un cliente)
```

## Reglas

1. **Este proyecto nunca escribe fuera de `dist/olivergOG/`**, con una única
   excepción: `dist/robots.txt`, y solo si ese archivo todavía no existe.
2. **El `robots.txt` de la raíz pertenece a Grolow Portfolios.** Es el único que
   Google lee en todo el host, y debe declarar los dos sitemaps:
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
5. Mientras la raíz siga vacía, `vercel.json` de este proyecto redirige `/` a
   `/olivergOG` con un **307**. En cuanto Grolow Portfolios ocupe la raíz, ese
   redirect se elimina de aquí.
