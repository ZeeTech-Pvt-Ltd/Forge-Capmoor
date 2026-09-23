import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { SECTION_IDS } from '../lib/navigation'
import { IconClock, IconEye, IconGraph } from './Icons'
import { ProvenanceArt } from './TradingArt'

import './Technology.css'

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

        {/* Drawn, not photographed. The section's claim is that the rationale
            is assembled from records made while the platform was trading, so
            the drawing shows exactly that: an action, the records under it, and
            the spine that connects them. */ }
        <Reveal className="tech__visual" delay={140}>
          <ProvenanceArt className="tech__art" />
        </Reveal>
      </div>
    </section>
  )
}

export default Technology
