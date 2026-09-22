import './NetworkSvg.css'

/**
 * The hero network's connectors.
 *
 * One `<linearGradient>` per path, each anchored to that path's own endpoints
 * with `gradientUnits="userSpaceOnUse"`, so every line fades from the hub's
 * warm orange out to near-nothing at the chip it points at — rather than each
 * line carrying the same left-to-right gradient regardless of direction.
 *
 * `pathLength="1"` normalises every path, so the single dash rule in
 * NetworkSvg.css draws each line at its own speed in its own time.
 *
 * The drawing stretches to its container (`preserveAspectRatio="none"`) because
 * the canvas in lib/heroNetwork.js is authored to the shape of the hero, not to
 * a fixed ratio. Chips are positioned as a fraction of that same box, so a
 * stretched canvas keeps every endpoint welded to its chip at any hero size.
 * The guide rings are NOT here: stretching would turn them into ellipses, so
 * they are drawn in CSS against the hub instead (`HeroHub`).
 *
 * `idPrefix` namespaces the gradient ids. Two instances on one page would
 * otherwise both claim `net-desktop-l1`, and every `url(#…)` would resolve to
 * whichever came first in document order.
 */
export function NetworkSvg({ layout, idPrefix, className }) {
  const gradientId = (path) => `${idPrefix}-${layout.name}-${path.id}`

  return (
    <svg
      className={className}
      viewBox={layout.viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {layout.paths.map((path) => (
          <linearGradient
            key={path.id}
            id={gradientId(path)}
            gradientUnits="userSpaceOnUse"
            x1={path.from[0]}
            y1={path.from[1]}
            x2={path.to[0]}
            y2={path.to[1]}
          >
            <stop offset="0" stopColor="#FF4B2B" stopOpacity="0.62" />
            <stop offset="0.42" stopColor="#FF6A3A" stopOpacity="0.4" />
            <stop offset="1" stopColor="#FF9E45" stopOpacity="0.06" />
          </linearGradient>
        ))}
      </defs>

      <g className="net-svg__lines">
        {layout.paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            pathLength="1"
            fill="none"
            stroke={`url(#${gradientId(path)})`}
            strokeWidth="1.6"
            strokeLinecap="round"
            style={{ '--line-delay': `${path.delay}ms` }}
          />
        ))}
      </g>
    </svg>
  )
}

export default NetworkSvg
