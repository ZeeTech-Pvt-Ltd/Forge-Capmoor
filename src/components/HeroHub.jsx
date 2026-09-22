import { ForgeMark } from './Icons'

import './HeroHub.css'

/**
 * The Forge Capmoor hub at the centre of the hero network.
 *
 * A dark machined square holding the hexagonal emblem and the wordmark, with
 * two concentric guide rings and a slow floating motion. It sits above the
 * connector SVG so the lines appear to emerge from behind it rather than from
 * a point in open space.
 *
 * The rings are drawn here rather than in the SVG because the connector canvas
 * is stretched to the shape of the hero (`preserveAspectRatio="none"`), which
 * would squash a circle drawn in that space into an ellipse. As an inset
 * percentage of the hub's own square box they stay perfectly round at any
 * hero size. `scale` is a multiple of the hub's width: 2.6 puts the first ring
 * at 260% of the hub, i.e. 80% of the hub's width outside it on every side.
 */
export function HeroHub({ hub, layout }) {
  const style = {
    left: `${(hub.cx / layout.width) * 100}%`,
    top: `${(hub.cy / layout.height) * 100}%`,
    width: `${hub.pct}%`,
  }

  return (
    <div className="hero-hub" style={style}>
      {(layout.rings ?? []).map((ring) => (
        <span
          key={ring.scale}
          className="hero-hub__ring"
          style={{ inset: `${-(ring.scale - 1) * 50}%`, opacity: ring.opacity }}
          aria-hidden="true"
        />
      ))}

      <div className="hero-hub__card">
        <span className="hero-hub__mark">
          <ForgeMark size="100%" variant="stroke" />
        </span>

        <span className="hero-hub__word">
          <span className="hero-hub__word-line">Forge</span>
          <span className="hero-hub__word-line hero-hub__word-line--strong">Capmoor</span>
        </span>
      </div>
    </div>
  )
}

export default HeroHub
