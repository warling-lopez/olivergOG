/**
 * Genera las imágenes Open Graph (1200x630 JPG, < 300 KB) en public/og/.
 *   npm run og
 *
 * TODO_CLIENTE: cuando llegue el retrato recortado y el arte final,
 * sustituir estos JPG por los exportados desde el diseño.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/og')

const INK = '#04091B'
const INK800 = '#0B1B45'
const BRAND = '#1E6BFF'
const PAPER = '#F7F9FC'
const MIST = '#A9B7D4'

const DISPLAY = 'Archivo, Helvetica Neue, Helvetica, Arial, sans-serif'
const SANS = 'Inter, Helvetica Neue, Helvetica, Arial, sans-serif'

/** Titular bicolor a 92 px: sigue siendo legible en la miniatura de WhatsApp. */
const svg = (line1, line2, kicker) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="70%">
      <stop offset="0%" stop-color="${BRAND}" stop-opacity="0.30"/>
      <stop offset="70%" stop-color="${BRAND}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="figure" x1="0" y1="0" x2="0" y2="1">
      <stop offset="45%" stop-color="${INK800}"/>
      <stop offset="100%" stop-color="${INK}"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="${INK}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- TODO_CLIENTE: aquí va el retrato recortado de Oliver. -->
  <circle cx="1010" cy="315" r="215" fill="url(#figure)" opacity="0.55"/>

  <g transform="translate(80,96)">
    <text x="0" y="0" font-family="${DISPLAY}" font-size="40" font-weight="900" fill="${PAPER}">O</text>
    <rect x="33" y="-32" width="4" height="40" rx="2" fill="${BRAND}" transform="rotate(20 35 -12)"/>
    <text x="46" y="0" font-family="${DISPLAY}" font-size="40" font-weight="900" fill="${PAPER}">G</text>
  </g>

  <text x="80" y="330" font-family="${DISPLAY}" font-size="92" font-weight="900" letter-spacing="-3" fill="${PAPER}">${line1}</text>
  <text x="80" y="424" font-family="${DISPLAY}" font-size="92" font-weight="900" letter-spacing="-3" fill="${BRAND}">${line2}</text>

  <rect x="80" y="470" width="64" height="3" fill="${MIST}" opacity="0.45"/>

  <text x="80" y="532" font-family="${SANS}" font-size="28" font-weight="500" fill="${MIST}">${kicker}</text>
</svg>`

const IMAGES = {
  'og-default': ['HABLEMOS', 'DE NEGOCIOS', 'Oliver G. · Consultoría de negocios · Santiago, RD'],
  'og-agenda': ['AGENDA', 'TU CITA', '30 minutos · Sin costo · Sin compromiso'],
  'og-servicio-diagnostico-empresarial': [
    'DIAGNÓSTICO',
    'EMPRESARIAL',
    'Números, procesos y equipo · Oliver G.',
  ],
  'og-servicio-consultoria-estrategica': [
    'CONSULTORÍA',
    'ESTRATÉGICA',
    'Estrategia por fases · Oliver G.',
  ],
  'og-servicio-mentoria-empresarial': [
    'MENTORÍA',
    'EMPRESARIAL',
    'Acompañamiento mes a mes · Oliver G.',
  ],
}

await mkdir(OUT, { recursive: true })

for (const [name, [line1, line2, kicker]] of Object.entries(IMAGES)) {
  const buffer = await sharp(Buffer.from(svg(line1, line2, kicker)))
    .jpeg({ quality: 84, chromaSubsampling: '4:4:4' })
    .toBuffer()
  await writeFile(path.join(OUT, `${name}.jpg`), buffer)
  console.log(`${name}.jpg  ${(buffer.length / 1024).toFixed(0)} KB`)
}
