import { useEffect, useState } from 'react'

/**
 * True once the page has scrolled past `offset`.
 *
 * Used to tighten the header into its "floating pill" state. Reads are
 * coalesced into a rAF so a fast scroll cannot queue up work, and the
 * listener is passive so it never blocks scrolling.
 */
export function useScrolled(offset = 12) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0

    const read = () => {
      frame = 0
      setScrolled(window.scrollY > offset)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [offset])

  return scrolled
}
