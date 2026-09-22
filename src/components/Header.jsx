import { useCallback, useEffect, useRef, useState } from 'react'

import { Link, useRoute } from '../lib/router'
import { NAV_LINKS } from '../lib/navigation'
import { useScrolled } from '../hooks/useScrolled'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { IconClose, IconMenu, Logo } from './Icons'

import './Header.css'

const FOCUSABLE = 'a[href], button:not([disabled])'

export function Header() {
  const scrolled = useScrolled(8)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { path } = useRoute()

  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const triggerRef = useRef(null)

  const close = useCallback(() => setOpen(false), [])

  // The drawer is a small-screen affordance only. If the viewport crosses
  // into the desktop layout while it is open, close it rather than leaving
  // an orphaned panel behind the desktop nav.
  useEffect(() => {
    if (isDesktop && open) setOpen(false)
  }, [isDesktop, open])

  // Any route change dismisses the drawer.
  useEffect(() => {
    setOpen(false)
  }, [path])

  // Closing always hands focus back to the trigger, so a keyboard user is
  // returned to the control they opened rather than dropped at the top of the
  // document. Used by Escape, the backdrop and the panel links alike.
  const handleClose = useCallback(() => {
    close()
    triggerRef.current?.focus()
  }, [close])

  // While open: lock background scroll, close on Escape, and keep Tab
  // inside the panel so keyboard users cannot wander into hidden content.
  useEffect(() => {
    if (!open) return

    const { body } = document
    const previousOverflow = body.style.overflow
    body.style.overflow = 'hidden'

    const panel = panelRef.current

    // The panel transitions visibility from `hidden`, and an element that is
    // still hidden cannot take focus — so the initial focus has to wait for
    // the next frame, once the open styles have been applied.
    const focusFrame = requestAnimationFrame(() => {
      panel?.querySelector(FOCUSABLE)?.focus()
    })

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        handleClose()
        return
      }

      if (event.key !== 'Tab' || !panel) return

      const nodes = Array.from(panel.querySelectorAll(FOCUSABLE))
      if (nodes.length === 0) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', onKeyDown)
      body.style.overflow = previousOverflow
    }
  }, [open, handleClose])

  return (
    <header className="header" data-scrolled={scrolled || undefined}>
      <div className="header__inner">
        <div className="header__bar">
          <Link to="/" className="header__brand" aria-label="Forge Capmoor home">
            <Logo size={32} />
          </Link>

          <nav className="header__nav" aria-label="Primary">
            <ul className="header__nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="header__nav-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <Link
              to="/signup"
              className="btn btn--primary btn--sm header__cta"
            >
              Sign up
            </Link>

            <button
              ref={triggerRef}
              type="button"
              className="header__menu-btn"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => (open ? handleClose() : setOpen(true))}
            >
              {open ? <IconClose size={22} /> : <IconMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop is decorative; the panel itself carries the semantics. */}
      <div
        className="header__backdrop"
        data-open={open || undefined}
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        id="mobile-nav"
        ref={panelRef}
        className="header__panel"
        data-open={open || undefined}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={open ? undefined : true}
      >
        <nav aria-label="Mobile">
          <ul className="header__panel-list">
            {NAV_LINKS.map((link, index) => (
              <li key={link.to} style={{ '--i': index }}>
                <Link to={link.to} className="header__panel-link" onClick={handleClose}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          to="/signup"
          className="btn btn--primary btn--lg header__panel-cta"
          onClick={handleClose}
        >
          Sign up
        </Link>
      </div>
    </header>
  )
}

export default Header
