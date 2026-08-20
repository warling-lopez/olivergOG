/**
 * Genera public/sitemap.xml a partir de config/seo.ts.
 * Se ejecuta en `prebuild`, así que el sitemap nunca se desincroniza de las rutas.
 */
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { INDEXABLE_PATHS, absoluteUrl } from '../src/config/seo'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const TODAY = new Date().toISOString().slice(0, 10)

const PRIORITY: Record<string, string> = {
  '/': '1.0',
  '/agenda': '0.9',
  '/privacidad': '0.2',
  '/terminos': '0.2',
}

const entries = INDEXABLE_PATHS.map((route) => {
  const priority = PRIORITY[route] ?? '0.8'
  const changefreq = route === '/' ? 'monthly' : 'yearly'
  return [
    '  <url>',
    `    <loc>${absoluteUrl(route)}</loc>`,
    `    <lastmod>${TODAY}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n')
}).join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`

writeFileSync(path.join(ROOT, 'public/sitemap.xml'), xml, 'utf8')
console.log(`sitemap.xml → ${INDEXABLE_PATHS.length} rutas`)
