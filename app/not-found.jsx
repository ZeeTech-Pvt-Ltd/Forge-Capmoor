import NotFound from '../src/views/NotFound'

/**
 * The 404. Next renders this to `out/404.html` and serves it with a real 404
 * status, which is the thing the Vite build could not do — it returned the
 * homepage at HTTP 200 for any unknown path and relied on a `noindex` tag to
 * make up for it. A status code cannot be argued with; a meta tag can.
 *
 * The title and description are rendered as elements rather than exported as
 * `metadata`, because `not-found.jsx` does not support that export. React 19
 * hoists both into `<head>`, which is what puts a title on the tab instead of
 * the URL. Without this the page shipped with no `<title>` at all.
 *
 * `robots` is deliberately not set. Next emits its own `noindex` for this
 * route; adding a second produces two tags in the HTML, which is how a page
 * ends up indexed despite the one you wrote.
 */
export default function NotFoundRoute() {
  return (
    <>
      <title>Page Not Found | Forge Capmoor</title>
      <meta name="description" content="That page does not exist on forge-capmoor.net." />
      <NotFound />
    </>
  )
}
