import { INDEXABLE_ROUTES, SITE_ORIGIN } from '../src/lib/seo'

/**
 * Generated from the same list that decides which routes are indexable, so the
 * sitemap cannot advertise a URL the site does not have, or omit one it does.
 * `/thank-you` is absent because it is noindex, and listing a noindex URL
 * contradicts its own robots directive.
 *
 * This replaced a hand-written `public/sitemap.xml`. That file was correct
 * until the route list changed, at which point nothing failed - it just went
 * quietly stale.
 */

// Static export: this must not try to run per request.
export const dynamic = 'force-static'

const PRIORITY = { '/': 1.0, '/about': 0.8, '/faq': 0.8, '/signup': 0.8 }
const YEARLY = new Set(['/risk-disclosure', '/privacy', '/terms'])

export default function sitemap() {
  const lastModified = new Date()

  return INDEXABLE_ROUTES.map((route) => ({
    // No trailing slash on the root, matching what Next emits as the page's
    // canonical. Next normalises `https://forge-capmoor.net/` down to the bare
    // origin, so a sitemap entry with the slash disagreed with the canonical
    // beside it over a URL that is the same resource either way.
    url: `${SITE_ORIGIN}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: YEARLY.has(route) ? 'yearly' : 'monthly',
    priority: PRIORITY[route] ?? 0.5,
  }))
}
