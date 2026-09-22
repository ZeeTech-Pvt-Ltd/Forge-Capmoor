import { useId } from 'react'

import './Logo.css'

/**
 * Forge Capmoor — icon set.
 *
 * Every icon is drawn here rather than pulled from a library: it keeps the
 * bundle free of a dependency, guarantees a single consistent stroke weight
 * and cap style, and means the marks are ours.
 *
 * Conventions: 24x24 viewBox, stroked with currentColor, 1.75 weight,
 * round caps and joins. `aria-hidden` is set because icons here are always
 * decorative — the adjacent text carries the meaning.
 */

function Glyph({ size = 22, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

/* --- Hero network -------------------------------------------------------- */

/** An activity waveform — a synthesised signal. */
export function IconSignal(props) {
  return (
    <Glyph {...props}>
      <path d="M2.75 12.5h3.1l2.3-6.2 3.2 11.4 2.6-8.2 1.7 3h5.6" />
    </Glyph>
  )
}

/** A trend line through detected points — pattern recognition. */
export function IconPattern(props) {
  return (
    <Glyph {...props}>
      <path d="M3.5 17.5 8 11l3.8 3.2L16.5 6l4 3.6" />
      <circle cx="8" cy="11" r="1.5" />
      <circle cx="16.5" cy="6" r="1.5" />
      <path d="M2.5 21h19" />
    </Glyph>
  )
}

/** A shield over a calibrated band — risk framing, not risk removal. */
export function IconShield(props) {
  return (
    <Glyph {...props}>
      <path d="M12 2.75 19 5.6v5.3c0 4.3-2.9 7.7-7 9.35-4.1-1.65-7-5.05-7-9.35V5.6z" />
      <path d="M8.8 12h6.4" />
    </Glyph>
  )
}

/** An eye — the reasoning is visible, not hidden. */
export function IconEye(props) {
  return (
    <Glyph {...props}>
      <path d="M2.5 12S6.2 5.75 12 5.75 21.5 12 21.5 12 17.8 18.25 12 18.25 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.9" />
    </Glyph>
  )
}

/** A connected node graph — data integrity across sources. */
export function IconGraph(props) {
  return (
    <Glyph {...props}>
      <path d="M12 5.6 5.5 16.4h13z" />
      <circle cx="12" cy="5" r="2.1" />
      <circle cx="5.5" cy="17" r="2.1" />
      <circle cx="18.5" cy="17" r="2.1" />
    </Glyph>
  )
}

/** A closed cycle — scheduled, repeatable automation. */
export function IconLoop(props) {
  return (
    <Glyph {...props}>
      <path d="M20.25 12a8.25 8.25 0 0 1-14.1 5.82M3.75 12A8.25 8.25 0 0 1 17.85 6.18" />
      <path d="M20.25 6.4V12h-5.6M3.75 17.6V12h5.6" />
    </Glyph>
  )
}

/* --- Section / capability icons ------------------------------------------ */

export function IconLayers(props) {
  return (
    <Glyph {...props}>
      <path d="M12 3.25 20.5 7.9 12 12.55 3.5 7.9z" />
      <path d="M3.5 12.4 12 17.05l8.5-4.65" />
      <path d="M3.5 16.5 12 21.15l8.5-4.65" />
    </Glyph>
  )
}

export function IconGauge(props) {
  return (
    <Glyph {...props}>
      <path d="M20.5 17.25a9 9 0 1 0-17 0" />
      <path d="M12 14.25 16 9.5" />
      <circle cx="12" cy="15" r="1.4" />
    </Glyph>
  )
}

export function IconDoc(props) {
  return (
    <Glyph {...props}>
      <path d="M6.25 3.25h7.5l4 4v13.5h-11.5z" />
      <path d="M13.75 3.25v4h4" />
      <path d="M9.25 12.75h5.5M9.25 16.25h3.5" />
    </Glyph>
  )
}

export function IconClock(props) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M12 6.75V12l3.25 2" />
    </Glyph>
  )
}

export function IconCompass(props) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="12" r="8.75" />
      <path d="m15.6 8.4-2.05 5.15L8.4 15.6l2.05-5.15z" />
    </Glyph>
  )
}

export function IconBolt(props) {
  return (
    <Glyph {...props}>
      <path d="M13.4 2.5 5.25 13.4h5.9l-.55 8.1L18.75 10.6h-5.9z" />
    </Glyph>
  )
}

export function IconLock(props) {
  return (
    <Glyph {...props}>
      <rect x="4.75" y="10.25" width="14.5" height="10.5" rx="2.5" />
      <path d="M8.25 10.25V7.5a3.75 3.75 0 0 1 7.5 0v2.75" />
      <path d="M12 14.5v2.5" />
    </Glyph>
  )
}

export function IconSliders(props) {
  return (
    <Glyph {...props}>
      <path d="M5 4.5v5.25M5 14.25v5.25M12 4.5v9.5M12 18.5v1M19 4.5v1.5M19 10.5v9" />
      <circle cx="5" cy="12" r="2.1" />
      <circle cx="12" cy="16.4" r="2.1" />
      <circle cx="19" cy="8.4" r="2.1" />
    </Glyph>
  )
}

export function IconScale(props) {
  return (
    <Glyph {...props}>
      <path d="M12 3.75v16.5M6.5 20.25h11" />
      <path d="M12 6.5 4.75 8.75 7.5 14.5a3 3 0 0 0 5 0z" />
      <path d="M12 6.5l7.25 2.25-2.75 5.75a3 3 0 0 1-5 0z" />
    </Glyph>
  )
}

export function IconSearch(props) {
  return (
    <Glyph {...props}>
      <circle cx="10.75" cy="10.75" r="6.75" />
      <path d="m15.75 15.75 4.5 4.5" />
    </Glyph>
  )
}

/* --- Interface ------------------------------------------------------------ */

export function IconArrowRight({ size = 18, ...rest }) {
  return (
    <Glyph size={size} {...rest}>
      <path d="M4.25 12h15.5" />
      <path d="m13.5 5.75 6.25 6.25-6.25 6.25" />
    </Glyph>
  )
}

export function IconChevronDown({ size = 18, ...rest }) {
  return (
    <Glyph size={size} {...rest}>
      <path d="m6 9.5 6 6 6-6" />
    </Glyph>
  )
}

export function IconMenu({ size = 22, ...rest }) {
  return (
    <Glyph size={size} {...rest}>
      <path d="M3.75 7h16.5M3.75 12h16.5M3.75 17h16.5" />
    </Glyph>
  )
}

export function IconClose({ size = 22, ...rest }) {
  return (
    <Glyph size={size} {...rest}>
      <path d="M6 6 18 18M18 6 6 18" />
    </Glyph>
  )
}

export function IconPlus({ size = 20, ...rest }) {
  return (
    <Glyph size={size} {...rest}>
      <path d="M12 5.25v13.5M5.25 12h13.5" />
    </Glyph>
  )
}

export function IconCheck({ size = 18, ...rest }) {
  return (
    <Glyph size={size} {...rest}>
      <path d="m4.75 12.5 4.75 4.75L19.25 7.5" />
    </Glyph>
  )
}

/* --- Contact -------------------------------------------------------------- */

export function IconMail(props) {
  return (
    <Glyph {...props}>
      <rect x="2.75" y="5.25" width="18.5" height="13.5" rx="2.5" />
      <path d="m3.6 7.6 7.25 5.05a2 2 0 0 0 2.3 0L20.4 7.6" />
    </Glyph>
  )
}

export function IconPin(props) {
  return (
    <Glyph {...props}>
      <path d="M12 21.25s7-5.7 7-11.25a7 7 0 1 0-14 0c0 5.55 7 11.25 7 11.25Z" />
      <circle cx="12" cy="10" r="2.75" />
    </Glyph>
  )
}

/* --- Brand ---------------------------------------------------------------- */

/**
 * The Forge Capmoor emblem.
 *
 * A flat-topped hexagon — the shape of a forged nut, and a deliberate move
 * away from the cube and robot imagery this market usually reaches for.
 * Inside sits an "F" whose arm terminals are chamfered, so the letterform
 * reads as machined rather than typeset.
 *
 * `variant="solid"` fills the hexagon (footer, favicon, dark panels);
 * the default strokes it (hero hub, light backgrounds).
 */
export function ForgeMark({ size = 44, variant = 'stroke', ...rest }) {
  // `useId` rather than a name derived from the variant: the mark appears more
  // than once per page (the hero hub and the closing CTA both stroke it), and
  // two elements sharing an id is invalid — every `url(#…)` would resolve to
  // whichever came first in document order. Punctuation is stripped because
  // React's ids contain characters that are awkward inside a URL fragment.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const id = `fm-grad-${variant}-${uid}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <defs>
        <linearGradient id={id} x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF7A4D" />
          <stop offset="0.55" stopColor="#FF4B2B" />
          <stop offset="1" stopColor="#E23A1B" />
        </linearGradient>
      </defs>

      {variant === 'solid' ? (
        <>
          <path
            d="M24 3.4 41.8 13.7v20.6L24 44.6 6.2 34.3V13.7z"
            fill={`url(#${id})`}
          />
          {/* Inner hexagon etched at low opacity for a little depth. */}
          <path
            d="M24 8.6 37.2 16.2v15.6L24 39.4 10.8 31.8V16.2z"
            stroke="#0E0E11"
            strokeOpacity="0.16"
            strokeWidth="1.4"
            fill="none"
          />
          <path
            d="M17.5 14H30.5L28.7 17.6H21.1V21.8H29L27.3 25.3H21.1V34H17.5Z"
            fill="#0E0E11"
            fillOpacity="0.88"
          />
        </>
      ) : (
        <>
          <path
            d="M24 3.4 41.8 13.7v20.6L24 44.6 6.2 34.3V13.7z"
            stroke={`url(#${id})`}
            strokeWidth="2.2"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M24 8.6 37.2 16.2v15.6L24 39.4 10.8 31.8V16.2z"
            stroke={`url(#${id})`}
            strokeOpacity="0.28"
            strokeWidth="1.4"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M17.5 14H30.5L28.7 17.6H21.1V21.8H29L27.3 25.3H21.1V34H17.5Z"
            fill={`url(#${id})`}
          />
        </>
      )}
    </svg>
  )
}

/**
 * Full brand lockup: emblem plus wordmark.
 * The wordmark is set in the display face with tighter tracking than the
 * body copy so it holds together at small sizes.
 */
export function Logo({ size = 34, tone = 'light', ...rest }) {
  return (
    <span className={`logo logo--${tone}`} {...rest}>
      <ForgeMark size={size} />
      <span className="logo__word">
        Forge{' '}
        <span className="logo__word-accent">Capmoor</span>
      </span>
    </span>
  )
}
