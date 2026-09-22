import { useEffect } from 'react'

const SITE_ORIGIN = 'https://forge-capmoor.net'

/**
 * Per-route document metadata.
 *
 * The homepage's title, description and canonical are also in index.html so
 * a crawler that never executes the bundle still sees them; this hook exists
 * for the routes that cannot be described in a single static file.
 *
 * The canonical is always rebuilt from SITE_ORIGIN plus the route path.
 * Nothing here ever reads `window.location.origin`, which is what keeps a
 * localhost or preview-deployment URL from being canonicalised.
 */
export function useDocumentMeta({ title, description, path, noindex = false }) {
  useEffect(() => {
    if (title) document.title = title

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }

    if (path) {
      // A noindex page has no canonical URL to declare. Leaving index.html's
      // static canonical in place would claim the 404 *is* the homepage, and
      // inventing one for the requested path would advertise a URL that does
      // not exist — so the tag is dropped instead.
      if (noindex) {
        document.querySelector('link[rel="canonical"]')?.remove()
      } else {
        const href = `${SITE_ORIGIN}${path === '/' ? '/' : path}`
        let canonical = document.querySelector('link[rel="canonical"]')
        if (!canonical) {
          canonical = document.createElement('link')
          canonical.setAttribute('rel', 'canonical')
          document.head.appendChild(canonical)
        }
        canonical.setAttribute('href', href)
      }
    }

    let robots = document.querySelector('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.setAttribute('name', 'robots')
      document.head.appendChild(robots)
    }
    robots.setAttribute(
      'content',
      noindex
        ? 'noindex, follow'
        : 'index, follow, max-image-preview:large, max-snippet:-1',
    )
  }, [title, description, path, noindex])
}
