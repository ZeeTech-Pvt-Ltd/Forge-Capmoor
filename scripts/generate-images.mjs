/**
 * Rasterises the two generated images in /public.
 *
 * Social platforms and iOS will not accept an SVG, so og-image.svg and
 * favicon.svg are converted here into og-image.png and apple-touch-icon.png.
 *
 * The output is committed, so this only needs re-running when the source
 * artwork changes:
 *
 *   npm run images
 *
 * `sharp` is a devDependency. It is a build-time tool only and none of it
 * ships to the browser.
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')

async function buildOgImage() {
  const svg = await readFile(path.join(publicDir, 'og-image.svg'))

  await sharp(svg, { density: 96 })
    .resize(1200, 630)
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(publicDir, 'og-image.png'))

  console.log('  og-image.png        1200x630')
}

async function buildAppleTouchIcon() {
  const svg = await readFile(path.join(publicDir, 'favicon.svg'))
  const size = 180
  const inner = Math.round(size * 0.78)

  const mark = await sharp(svg, { density: 600 }).resize(inner, inner).png().toBuffer()

  await sharp({
    create: { width: size, height: size, channels: 4, background: '#ffffff' },
  })
    .composite([{ input: mark, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'))

  console.log('  apple-touch-icon.png  180x180')
}

console.log('Generating images:')
await buildOgImage()
await buildAppleTouchIcon()
console.log('Done.')
