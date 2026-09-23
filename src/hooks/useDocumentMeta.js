import { useEffect } from 'react'

import { OG_IMAGE, OG_IMAGE_ALT, ROUTE_META, SITE_NAME, SITE_ORIGIN } from '../lib/seo'

/**
 * Per-route document metadata.
 *
 * Everything comes from `lib/seo.js`, which `scripts/prerender.mjs` also reads
 * when it writes the static files. One source, so a title changed here is
 * changed in the crawlable HTML too — the failure mode of a client-rendered
 * site is exactly that those two drift and only one of them is ever noticed.
 *
 * The Open Graph and Twitter tags are set on every navigation, not just left in
 * index.html. They used to be static, which meant every shared URL — /about,
 * /faq, the legal pages — previewed as the homepage with the homepage's title.
 * Social scrapers do not run JavaScript, so the real fix is the prerendered
 * HTML; this keeps the client-rendered view consistent with it for anything
 * that reads the DOM after hydration.
 *
 * The canonical is always rebuilt from `SITE_ORIGIN`, never from
 * `window.location.origin`. That is what keeps a preview deployment or a local
 * dev server from canonicalising itself.
 */
function setMeta(attribute, key, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export function useDocumentMeta(path) {
  useEffect(() => {
    const meta = ROUTE_META[path] ?? ROUTE_META['/404']
    const url = `${SITE_ORIGIN}${path === '/' ? '/' : path}`

    document.title = meta.title

    setMeta('name', 'description', meta.description)
    setMeta('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1')

    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', 'en_AU')
    setMeta('property', 'og:title', meta.title)
    setMeta('property', 'og:description', meta.description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', OG_IMAGE)
    setMeta('property', 'og:image:width', '1200')
    setMeta('property', 'og:image:height', '630')
    setMeta('property', 'og:image:alt', OG_IMAGE_ALT)

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', meta.title)
    setMeta('name', 'twitter:description', meta.description)
    setMeta('name', 'twitter:image', OG_IMAGE)
    setMeta('name', 'twitter:image:alt', OG_IMAGE_ALT)

    // A noindex page has no canonical URL to declare. Leaving index.html's
    // static canonical in place would claim the 404 *is* the homepage, and
    // inventing one for the requested path would advertise a URL that does
    // not exist — so the tag is dropped instead.
    if (meta.noindex) {
      document.head.querySelector('link[rel="canonical"]')?.remove()
    } else {
      let canonical = document.head.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', url)
    }
  }, [path])
}
