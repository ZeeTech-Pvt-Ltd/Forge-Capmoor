'use client'

import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

/**
 * The app's navigation surface, on top of Next's router.
 *
 * This file used to be an ~80 line History-API router, written when the site
 * was a Vite SPA with no router at all. Next has one, so the implementation is
 * gone — but the shape it exported is kept, because ten components import
 * `Link` and `useRoute` from here and none of them had to change for the
 * migration.
 *
 * What is preserved deliberately:
 *
 *   - `to` rather than `href`, so every call site stays as it was.
 *   - `Link` still renders a real `<a>` with a real href. Next's Link does the
 *     same, so middle-click, "copy link" and crawlers behave normally.
 *   - `useRoute()` still returns `{ path, navigate }`.
 *
 * What the old router did that Next does itself: focus `<main>` after a
 * client-side navigation, scroll to top, restore the scroll position on
 * back/forward. Those were hand-written here because nothing else provided
 * them; Next's App Router handles them, and duplicating them would double the
 * scroll and fight the framework.
 */

/**
 * Preserves the old signature: `to`, not `href`.
 *
 * `prefetch={false}` is deliberate. Next's static export emits the route HTML
 * but not the per-segment RSC payload the prefetcher asks for, so every link in
 * view fired a request for `/about/__next.about.__PAGE__.txt` that 404s, fell
 * back to a full page load, and left a console error on every route. Turning
 * prefetching off removes the request and changes nothing about the result: the
 * navigation was already a full page load, because the prefetch never succeeded.
 * `next build` still prerenders every route to static HTML, so nothing here
 * affects what a crawler or a first-time visitor receives.
 */
export function Link({ to, children, ...rest }) {
  return (
    <NextLink href={to} prefetch={false} {...rest}>
      {children}
    </NextLink>
  )
}

/**
 * The route, in the shape the components expect.
 *
 * `path` is Next's pathname, already normalised — `/privacy/` and `/privacy`
 * are one route, which the old `normalise()` handled by hand.
 */
export function useRoute() {
  const path = usePathname()
  const router = useRouter()

  return {
    path,
    navigate: (to) => router.push(to),
  }
}
