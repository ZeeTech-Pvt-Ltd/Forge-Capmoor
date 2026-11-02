import { OG_IMAGE, OG_IMAGE_ALT, ROUTE_META, SITE_NAME, SITE_ORIGIN } from './seo'

/**
 * Maps the route metadata in `lib/seo.js` onto Next's Metadata API.
 *
 * `seo.js` stays the single source. It was written for two consumers — the
 * client hook that set the tags on navigation, and the prerender script that
 * baked them into a static file per route. Next replaces both, so this file is
 * the new second consumer and the data itself did not move.
 *
 * Two rules carried over because they are easy to get wrong:
 *
 *   - A noindex route carries no canonical. Declaring both is contradictory.
 *   - The not-found page drops `robots` entirely. Next emits its own for
 *     `not-found`, and setting one here puts two tags in the HTML.
 */
export function pageMetadata(route, { dropRobots = false } = {}) {
  const conf = ROUTE_META[route]
  if (!conf) throw new Error(`No SEO config for route "${route}"`)

  const url = `${SITE_ORIGIN}${route === '/' ? '/' : route}`
  const noindex = Boolean(conf.noindex)

  const meta = {
    // absolute: a root-level title template would otherwise wrap this.
    title: { absolute: conf.title },
    description: conf.description,
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_AU',
      title: conf.title,
      description: conf.description,
      url,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: conf.title,
      description: conf.description,
      images: [OG_IMAGE],
    },
  }

  if (!dropRobots) {
    meta.robots = noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 }
  }

  // No canonical on a noindex page: the two are contradictory signals.
  if (!noindex) meta.alternates = { canonical: url }

  return meta
}
