/**
 * Pasos posteriores al build:
 *   1. Prerenderiza los metadatos de cada ruta dentro de dist/olivergOG/.
 *   2. Deja un robots.txt en la raíz del host si todavía no existe.
 *
 * Sobre el punto 2: Google lee robots.txt ÚNICAMENTE en la raíz del host, así
 * que /olivergOG/robots.txt es invisible para el rastreador. La raíz de
 * myprofolio.grolow.com pertenece al proyecto Grolow Portfolios, que publica su
 * propio robots.txt declarando los sitemaps de ambos sitios. Por eso aquí la
 * copia es NO destructiva: si ese archivo ya existe, no se toca. Sobrescribirlo
 * podría desindexar el otro proyecto sin que nadie se entere.
 */
import { copyFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { prerender } from './prerender'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

prerender()

const from = path.join(ROOT, 'dist/olivergOG/robots.txt')
const to = path.join(ROOT, 'dist/robots.txt')

if (existsSync(to)) {
  console.log('· robots.txt de la raíz ya existe: se respeta (lo gestiona Grolow Portfolios)')
} else if (existsSync(from)) {
  copyFileSync(from, to)
  console.log('✓ robots.txt copiado a la raíz del host (provisional)')
}
