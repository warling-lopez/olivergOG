/**
 * Prerender de metadatos: escribe un index.html por ruta dentro de dist/,
 * con title, description, canonical, Open Graph, Twitter y JSON-LD ya
 * presentes en el HTML servido.
 *
 * Resuelve el problema real de una SPA: WhatsApp, LinkedIn, Facebook y varios
 * rastreadores no ejecutan JavaScript, así que nunca verían las etiquetas que
 * <Seo/> inyecta en runtime. El cuerpo sigue hidratándose con React.
 *
 * Se ejecuta en `postbuild`.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { INDEXABLE_PATHS, absoluteAsset, absoluteUrl, getSeo } from '../src/config/seo'
import { SITE } from '../src/config/site'
import { faqSchema, serviceGraph, siteGraph } from '../src/config/schema'
import { getService } from '../src/content/services'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
/* Debe coincidir con build.outDir de vite.config.ts. */
const DIST = path.join(ROOT, 'dist', 'olivergOG')

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const meta = (attr: 'name' | 'property', key: string, content: string) =>
  `    <meta ${attr}="${key}" content="${escape(content)}" />`

const ldJson = (id: string, data: object) =>
  `    <script type="application/ld+json" id="${id}">${JSON.stringify(data)}</script>`

function headFor(route: string): string {
  const seo = getSeo(route)
  const canonical = absoluteUrl(route)
  const image = absoluteAsset(`og/${seo.image ?? 'og-default.jpg'}`)
  const service = route.startsWith('/servicios/') ? getService(route.split('/').pop()) : undefined

  const tags = [
    `    <title>${escape(seo.title)}</title>`,
    meta('name', 'description', seo.description),
    `    <link rel="canonical" href="${canonical}" />`,
    meta(
      'name',
      'robots',
      seo.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1',
    ),
    meta('name', 'author', SITE.shortName),
    meta('name', 'geo.region', 'DO-25'),
    meta('name', 'geo.placename', SITE.address.city),
    meta('property', 'og:type', seo.type ?? 'website'),
    meta('property', 'og:site_name', SITE.shortName),
    meta('property', 'og:locale', 'es_DO'),
    meta('property', 'og:title', seo.title),
    meta('property', 'og:description', seo.description),
    meta('property', 'og:url', canonical),
    meta('property', 'og:image', image),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', seo.title),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', seo.title),
    meta('name', 'twitter:description', seo.description),
    meta('name', 'twitter:image', image),
    ldJson('ld-site', siteGraph),
  ]

  if (route === '/') tags.push(ldJson('ld-faq', faqSchema))
  if (service) tags.push(ldJson('ld-service', serviceGraph(service, seo.description)))

  return tags.join('\n')
}

export function prerender(): void {
  const template = readFileSync(path.join(DIST, 'index.html'), 'utf8')

  /* Quita del template las etiquetas por defecto que cada ruta va a reescribir. */
  const stripped = template
    .replace(/\n?\s*<title>[\s\S]*?<\/title>/, '')
    .replace(/\n?\s*<meta name="description"[^>]*>/g, '')
    .replace(/\n?\s*<meta property="og:[^>]*>/g, '')
    .replace(/\n?\s*<meta name="twitter:[^>]*>/g, '')
    .replace(/\n?\s*<link rel="canonical"[^>]*>/g, '')

  for (const route of [...INDEXABLE_PATHS, '/gracias']) {
    const html = stripped.replace('</head>', `${headFor(route)}\n  </head>`)
    const dir = route === '/' ? DIST : path.join(DIST, route)
    mkdirSync(dir, { recursive: true })
    writeFileSync(path.join(dir, 'index.html'), html, 'utf8')
    console.log(`prerender → ${route === '/' ? '/' : route + '/'}index.html`)
  }
}
