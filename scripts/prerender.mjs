/**
 * Writes a static HTML file per route, with that route's head metadata baked in.
 *
 * Without this, a crawler that does not execute the bundle reads the same head
 * for every URL: the homepage's title, the homepage's canonical, the homepage's
 * Open Graph tags. Google renders JavaScript, so it eventually sees the right
 * thing — but social scrapers do not, which is why every shared link used to
 * preview as the homepage regardless of the page it pointed at.
 *
 * Each file is `dist/index.html` with the metadata block swapped. The body is
 * untouched: the bundle still mounts and the router still draws the page, so
 * there is one copy of the markup and no hydration mismatch. What changes is
 * what a non-executing reader sees in `<head>`.
 *
 * Hosts serve `/about/index.html` for `/about` before falling through to the
 * SPA rewrite, so no routing configuration is needed.
 *
 * Run after `vite build`; `npm run build` chains it.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { INDEXABLE_ROUTES, OG_IMAGE, ROUTE_META, SITE_ORIGIN, SITE_NAME } from '../src/lib/seo.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')

const template = readFileSync(path.join(distDir, 'index.html'), 'utf8')

/**
 * Replaces one tag in the head. Throws if the pattern is missing, because a
 * silent no-op here would ship a page with the homepage's title and nobody
 * would notice until it showed up in a search result.
 */
function replaceTag(html, label, pattern, replacement) {
  const re = new RegExp(pattern, 'i')
  if (!re.test(html)) throw new Error(`prerender: no ${label} found in dist/index.html`)
  return html.replace(re, replacement)
}

function removeTag(html, pattern) {
  return html.replace(new RegExp(pattern, 'i'), '')
}

function headFor(meta, url) {
  let html = template

  html = replaceTag(html, 'title', '<title>[\\s\\S]*?</title>', `<title>${meta.title}</title>`)
  html = replaceTag(
    html,
    'description',
    '<meta\\s+name="description"[\\s\\S]*?/>',
    `<meta name="description" content="${meta.description}" />`
  )
  html = replaceTag(
    html,
    'og:title',
    '<meta\\s+property="og:title"[\\s\\S]*?/>',
    `<meta property="og:title" content="${meta.title}" />`
  )
  html = replaceTag(
    html,
    'og:description',
    '<meta\\s+property="og:description"[\\s\\S]*?/>',
    `<meta property="og:description" content="${meta.description}" />`
  )
  html = replaceTag(
    html,
    'og:url',
    '<meta\\s+property="og:url"[\\s\\S]*?/>',
    `<meta property="og:url" content="${url}" />`
  )
  html = replaceTag(
    html,
    'twitter:title',
    '<meta\\s+name="twitter:title"[\\s\\S]*?/>',
    `<meta name="twitter:title" content="${meta.title}" />`
  )
  html = replaceTag(
    html,
    'twitter:description',
    '<meta\\s+name="twitter:description"[\\s\\S]*?/>',
    `<meta name="twitter:description" content="${meta.description}" />`
  )

  if (meta.noindex) {
    // A noindex page has no canonical to declare. Leaving the homepage's in
    // place would claim the page is the homepage.
    html = removeTag(html, '<link\\s+rel="canonical"[\\s\\S]*?/>\\s*')
    html = replaceTag(
      html,
      'robots',
      '<meta\\s+name="robots"[\\s\\S]*?/>',
      `<meta name="robots" content="noindex, follow" />`
    )
  } else {
    html = replaceTag(
      html,
      'canonical',
      '<link\\s+rel="canonical"[\\s\\S]*?/>',
      `<link rel="canonical" href="${url}" />`
    )
  }

  return html
}

const written = []

for (const [route, meta] of Object.entries(ROUTE_META)) {
  // `/404` is not a real path — it is the metadata for whatever the router
  // could not match, and hosts already serve index.html for unknown paths.
  if (route === '/404') continue

  const url = `${SITE_ORIGIN}${route === '/' ? '/' : route}`
  const html = headFor(meta, url)

  if (route === '/') {
    writeFileSync(path.join(distDir, 'index.html'), html)
    written.push('/')
    continue
  }

  // Two files for the same route, because hosts disagree about which one a
  // bare path resolves to:
  //
  //   /about  -> dist/about.html        (extension resolution; Vercel, and
  //                                      most static hosts, do this)
  //   /about/ -> dist/about/index.html  (directory index; what `vite preview`
  //                                      does, and what a few hosts prefer)
  //
  // Without the second file the trailing-slash form falls through to the SPA
  // shell and serves the homepage's metadata. Without the first, so does the
  // ordinary form — which is exactly what happened when only the directory
  // index existed. Both canonicalise to the same URL, so this is not a
  // duplicate-content problem.
  writeFileSync(path.join(distDir, `${route.slice(1)}.html`), html)

  const dir = path.join(distDir, route)
  mkdirSync(dir, { recursive: true })
  writeFileSync(path.join(dir, 'index.html'), html)
  written.push(route)
}

/**
 * The sitemap is generated rather than hand-maintained, so the URL list cannot
 * drift from the routes that actually exist. It used to be a static file in
 * public/ with the eight URLs typed out; adding a page meant remembering to
 * add it in two places, and the copy that got forgotten was always this one.
 *
 * `lastmod` is the build date. Only URLs that are indexable are listed —
 * `/thank-you` is deliberately absent, because listing a `noindex` URL
 * contradicts the page's own robots directive.
 */
function writeSitemap() {
  const today = new Date().toISOString().slice(0, 10)
  const priority = { '/': '1.0', '/about': '0.8', '/faq': '0.8', '/signup': '0.8' }

  const urls = INDEXABLE_ROUTES.map((route) => {
    const loc = `${SITE_ORIGIN}${route === '/' ? '/' : route}`
    const p = priority[route] ?? '0.5'
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <priority>${p}</priority>`,
      '  </url>',
    ].join('\n')
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
  writeFileSync(path.join(distDir, 'sitemap.xml'), xml)
  return INDEXABLE_ROUTES.length
}

const sitemapCount = writeSitemap()

console.log(`prerendered ${written.length} routes: ${written.join(' ')}`)
console.log(`sitemap: ${sitemapCount} indexable URLs, lastmod ${new Date().toISOString().slice(0, 10)}`)
console.log(`  site origin : ${SITE_ORIGIN}`)
console.log(`  site name   : ${SITE_NAME}`)
console.log(`  og image    : ${OG_IMAGE}`)
