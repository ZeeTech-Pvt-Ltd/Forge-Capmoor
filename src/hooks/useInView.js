import { useEffect, useRef, useState } from 'react'

const THRESHOLD = 0.15
const ROOT_MARGIN = '0px 0px -8% 0px'

/**
 * One IntersectionObserver for the entire page.
 *
 * The homepage mounts 54 reveals. Giving each its own observer meant 54
 * observers and 54 timers doing identical work; a single observer watching 54
 * targets is far cheaper for the browser and produces the same result, because
 * every caller wants the same threshold and root margin.
 */
let observer = null
let fallbackTimer = null
let flushed = false
const pending = new Map()

/**
 * Safety net: if the observer never fires — a hidden ancestor, a layout edge
 * case, an environment without IntersectionObserver — show everything rather
 * than leaving the page blank below the fold. One timer replaces 54.
 */
function flushPending() {
  flushed = true
  fallbackTimer = null
  for (const notify of pending.values()) notify()
  pending.clear()
  observer?.disconnect()
  observer = null
}

function getObserver() {
  if (observer) return observer

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const notify = pending.get(entry.target)
        if (!notify) continue
        pending.delete(entry.target)
        observer.unobserve(entry.target)
        notify()
      }
    },
    { threshold: THRESHOLD, rootMargin: ROOT_MARGIN },
  )

  return observer
}

/**
 * Reports when an element first scrolls into view, once.
 *
 * Fails open: if IntersectionObserver is missing, or the element is already on
 * screen at mount, `inView` is true on the first paint. Content must never
 * depend on a scroll event to become readable.
 */
export function useInView({ enabled = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || !enabled) return

    if (flushed || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const notify = () => setInView(true)
    pending.set(node, notify)
    getObserver().observe(node)

    if (!fallbackTimer) {
      fallbackTimer = window.setTimeout(flushPending, 2500)
    }

    return () => {
      pending.delete(node)
      observer?.unobserve(node)
    }
  }, [enabled])

  return [ref, inView]
}
