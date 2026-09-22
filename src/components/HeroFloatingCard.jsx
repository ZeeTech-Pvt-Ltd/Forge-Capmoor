import { IconEye, IconGraph, IconLoop, IconPattern, IconShield, IconSignal } from './Icons'

import './HeroFloatingCard.css'

const ICONS = {
  signal: IconSignal,
  pattern: IconPattern,
  shield: IconShield,
  eye: IconEye,
  graph: IconGraph,
  loop: IconLoop,
}

/**
 * Decorative micro-visualisation inside a floating card.
 *
 * These are texture, not data — there are no numbers here and nothing is
 * claimed. They exist so each card reads as a tiny instrument panel rather
 * than a label with an icon bolted on.
 */
function MicroViz({ kind }) {
  const shared = {
    viewBox: '0 0 40 10',
    fill: 'none',
    className: 'hero-node__viz',
    'aria-hidden': 'true',
    focusable: 'false',
  }

  if (kind === 'bars') {
    return (
      <svg {...shared}>
        <rect x="0" y="5" width="4" height="5" rx="2" fill="currentColor" opacity="0.4" />
        <rect x="9" y="2" width="4" height="8" rx="2" fill="currentColor" opacity="0.72" />
        <rect x="18" y="6" width="4" height="4" rx="2" fill="currentColor" opacity="0.4" />
        <rect x="27" y="0" width="4" height="10" rx="2" fill="currentColor" />
        <rect x="36" y="4" width="4" height="6" rx="2" fill="currentColor" opacity="0.55" />
      </svg>
    )
  }

  if (kind === 'spark') {
    return (
      <svg {...shared}>
        <path
          d="M0 8.2 8 4.4 16 6.6 24 1.2 32 3.6 40 0.8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (kind === 'segments') {
    return (
      <svg {...shared}>
        <rect x="0" y="3.5" width="9" height="3" rx="1.5" fill="currentColor" opacity="0.32" />
        <rect x="11" y="3.5" width="9" height="3" rx="1.5" fill="currentColor" opacity="0.55" />
        <rect x="22" y="3.5" width="9" height="3" rx="1.5" className="hero-node__viz-accent" />
        <rect x="33" y="3.5" width="7" height="3" rx="1.5" fill="currentColor" opacity="0.32" />
      </svg>
    )
  }

  // 'steps'
  return (
    <svg {...shared}>
      <rect x="1" y="6" width="10" height="4" rx="2" fill="currentColor" opacity="0.3" />
      <rect x="15" y="3.4" width="10" height="6.6" rx="2" fill="currentColor" opacity="0.58" />
      <rect x="29" y="0.6" width="10" height="9.4" rx="2" fill="currentColor" />
    </svg>
  )
}

/**
 * One floating card or node chip on the hero network.
 *
 * Position and size come through as percentages of the stage, so the card
 * tracks its connector endpoint exactly however the stage is scaled. The
 * entrance delay mirrors the connector's draw delay, so each card arrives
 * as its own line reaches it.
 */
export function HeroFloatingCard({ node, layout, delay = 0 }) {
  const Icon = ICONS[node.icon]

  const style = {
    left: `${((node.x - node.w / 2) / layout.width) * 100}%`,
    top: `${((node.y - node.h / 2) / layout.height) * 100}%`,
    width: `${(node.w / layout.width) * 100}%`,
    // `min-height` rather than `height`: the box is a share of the hero, which
    // is a share of the viewport, so on a short window a fixed height would
    // clip the label. Letting the chip grow keeps its connector ending under
    // the chip rather than short of it — which is the failure that shows.
    minHeight: `${(node.h / layout.height) * 100}%`,
    '--node-delay': `${delay}ms`,
  }

  return (
    <div className={`hero-node hero-node--${node.variant}`} style={style}>
      <span className="hero-node__icon">
        <Icon size="100%" />
      </span>

      <span className="hero-node__body">
        <span className="hero-node__label">{node.label}</span>
        {node.viz ? <MicroViz kind={node.viz} /> : null}
      </span>
    </div>
  )
}

export default HeroFloatingCard
