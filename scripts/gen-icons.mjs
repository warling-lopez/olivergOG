/**
 * Rasteriza public/favicon.svg a los PNG que piden el manifest e iOS.
 *   npm run icons
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const PUBLIC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public')
const svg = await readFile(path.join(PUBLIC, 'favicon.svg'))

const SIZES = [
  ['favicon-192.png', 192],
  ['favicon-512.png', 512],
  ['apple-touch-icon.png', 180],
]

for (const [name, size] of SIZES) {
  const buffer = await sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'contain', background: '#04091B' })
    .png()
    .toBuffer()
  await writeFile(path.join(PUBLIC, name), buffer)
  console.log(`${name}  ${size}x${size}  ${(buffer.length / 1024).toFixed(0)} KB`)
}
