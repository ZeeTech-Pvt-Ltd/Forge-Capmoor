/**
 * Static export: every route is rendered to HTML at build time, which puts the
 * copy in the first response instead of behind a JS bundle. That replaces the
 * hand-written `scripts/prerender.mjs` the Vite build used, which copied
 * `index.html` per route and swapped the head tags — Next does the same thing
 * from the route files, and cannot fall out of step with them.
 *
 * `trailingSlash: false` emits `about.html` rather than `about/index.html`, so
 * the URLs match the entries in sitemap.xml exactly. Vercel serves `/about`
 * from `about.html` directly.
 *
 * `404.html` is emitted too, so an unknown path gets a real 404 status rather
 * than the homepage at 200.
 *
 * Redirects are not configured here: `redirects()` is unsupported with
 * `output: 'export'`. They live in vercel.json, applied before the static
 * files are served.
 */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
}

export default nextConfig
