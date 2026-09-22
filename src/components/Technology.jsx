import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { SECTION_IDS } from '../lib/navigation'
import { IconClock, IconEye, IconGraph } from './Icons'

import './Technology.css'

/**
 * Decorative provenance diagram: four recorded inputs converging into one
 * written output. Abstract on purpose — no labels, no numbers, nothing that
 * could be mistaken for a real reading.
 */
function ProvenanceDiagram() {
  const inputs = [60, 140, 220, 300]

  return (
    <svg
      className="tech__diagram"
      viewBox="0 0 420 360"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="tech-flow" gradientUnits="userSpaceOnUse" x1="44" y1="180" x2="250" y2="180">
          <stop offset="0" stopColor="#FF4B2B" stopOpacity="0.06" />
          <stop offset="1" stopColor="#FF4B2B" stopOpacity="0.55" />
        </linearGradient>

        <radialGradient id="tech-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FF4B2B" stopOpacity="0.28" />
          <stop offset="1" stopColor="#FF4B2B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="325" cy="180" rx="150" ry="130" fill="url(#tech-glow)" />

      {inputs.map((y) => (
        <path
          key={y}
          d={`M 44 ${y} C 150 ${y}, 150 180, 250 180`}
          stroke="url(#tech-flow)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ))}

      {inputs.map((y) => (
        <g key={`node-${y}`}>
          <circle cx="44" cy={y} r="13" fill="#1b1b22" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <circle cx="44" cy={y} r="4" fill="#FF4B2B" fillOpacity="0.85" />
        </g>
      ))}

      <rect
        x="250"
        y="124"
        width="150"
        height="112"
        rx="18"
        fill="#17171d"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
      />

      <circle cx="276" cy="150" r="5" fill="#FF4B2B" />
      <rect x="272" y="172" width="106" height="6" rx="3" fill="#ffffff" fillOpacity="0.2" />
      <rect x="272" y="190" width="106" height="6" rx="3" fill="#ffffff" fillOpacity="0.2" />
      <rect x="272" y="208" width="58" height="6" rx="3" fill="#ffffff" fillOpacity="0.12" />
    </svg>
  )
}

const POINTS = [
  {
    icon: IconGraph,
    title: 'Conditions are recorded, not reconstructed',
    text: 'When a pattern matches, the conditions that defined it are stored alongside it. The sentence you read later is assembled from those records.',
  },
  {
    icon: IconClock,
    title: 'Sources carry their own provenance',
    text: 'Every input knows where it came from and when it was last refreshed. A finding that leans on a stale source says so, in the finding.',
  },
  {
    icon: IconEye,
    title: 'Nothing is asserted without a trace',
    text: 'Output is generated from recorded evidence, so the platform never presents a conclusion it cannot walk you back through.',
  },
]

/**
 * Technology section — the one full-bleed dark band on the page.
 *
 * Going dark here does two things: it breaks the long run of light sections
 * at roughly the two-thirds mark, and it visually separates "what it does"
 * (light, above) from "why it is trustworthy" (dark, here).
 */
export function Technology() {
  return (
    <section
      id={SECTION_IDS.technology}
      className="section section--dark tech"
      aria-labelledby="tech-title"
    >
      <div className="tech__glow" aria-hidden="true" />

      <div className="container container--wide tech__inner">
        <div className="tech__text">
          <SectionHead
            align="start"
            eyebrow="Technology"
            id="tech-title"
            title="Explainability is a by-product of how the trading runs"
            lead="Most platforms write the explanation afterwards, by summarising what happened. Here the rationale is assembled from records the platform made while it was trading."
          />

          <ul className="tech__points">
            {POINTS.map((point, index) => {
              const Icon = point.icon
              return (
                <Reveal as="li" key={point.title} delay={index * 100} className="tech__point">
                  <span className="tech__point-icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="tech__point-title">{point.title}</h3>
                    <p className="tech__point-text">{point.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </div>

        <Reveal className="tech__visual" delay={140}>
          <ProvenanceDiagram />
        </Reveal>
      </div>
    </section>
  )
}

export default Technology
