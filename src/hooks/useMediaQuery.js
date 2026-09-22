import { useEffect, useState } from 'react'

/**
 * Subscribes to a media query and returns whether it currently matches.
 *
 * The initial value is read synchronously from matchMedia so the first render
 * already has the correct layout — no post-mount correction, therefore no
 * layout shift and no flash of the wrong composition.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false
    }
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return

    const mql = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)

    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
