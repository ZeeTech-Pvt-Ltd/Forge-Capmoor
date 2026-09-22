import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

/**
 * A minimal History-API router.
 *
 * The site has four routes, all static. Pulling in a routing library for that
 * would be more dependency than the problem deserves, so this is ~80 lines
 * covering exactly what is needed: pushState navigation, back/forward
 * support, in-page anchors, and scroll restoration.
 */

const RouterContext = createContext(null)

/** Strips the trailing slash so `/privacy/` and `/privacy` are one route. */
function normalise(pathname) {
  if (!pathname || pathname === '/') return '/'
  return pathname.replace(/\/+$/, '') || '/'
}

export function RouterProvider({ children }) {
  const [route, setRoute] = useState(() => ({
    path: normalise(window.location.pathname),
    hash: window.location.hash,
  }))

  useEffect(() => {
    const onPopState = () => {
      setRoute({ path: normalise(window.location.pathname), hash: window.location.hash })
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((to, { replace = false } = {}) => {
    const url = new URL(to, window.location.origin)

    // Same page, different document position: let the browser scroll rather
    // than pushing a duplicate history entry for the page we are already on.
    if (normalise(url.pathname) === normalise(window.location.pathname)) {
      if (url.hash) {
        window.history[replace ? 'replaceState' : 'pushState']({}, '', url.hash)
        setRoute({ path: normalise(url.pathname), hash: url.hash })
        return
      }
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    window.history[replace ? 'replaceState' : 'pushState']({}, '', url.pathname + url.search + url.hash)
    setRoute({ path: normalise(url.pathname), hash: url.hash })
  }, [])

  // Bring the requested section into view once the new route has painted, and
  // hand focus to the new page.
  const previousPath = useRef(route.path)

  useEffect(() => {
    const pathChanged = previousPath.current !== route.path
    previousPath.current = route.path

    if (route.hash) {
      const target = document.getElementById(route.hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    window.scrollTo({ top: 0, behavior: 'auto' })

    if (!pathChanged) return

    // A client-side navigation removes the element that had focus — the link
    // that was clicked, or the submit button — and focus falls back to <body>.
    // A screen reader user is then left at the top of the document with
    // nothing announced, which is the classic SPA navigation trap. Moving
    // focus to <main> re-establishes the reading position and makes the new
    // page's content the next thing read.
    //
    // preventScroll because the scroll was already placed above; letting the
    // browser scroll to the focus target would fight it.
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [route])

  const value = useMemo(() => ({ ...route, navigate }), [route, navigate])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRoute() {
  const context = useContext(RouterContext)
  if (!context) throw new Error('useRoute must be used inside <RouterProvider>')
  return context
}

/**
 * Anchor that routes client-side.
 *
 * Renders a real <a href> — so middle-click, right-click "copy link" and
 * crawlers all behave normally — and only intercepts plain left clicks.
 */
export function Link({ to, children, onClick, ...rest }) {
  const { navigate } = useRoute()

  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented) return

    // Leave modified clicks (new tab, download, …) to the browser.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (event.button !== 0) return

    event.preventDefault()
    navigate(to)
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
