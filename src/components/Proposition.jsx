import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { IconCheck, IconDoc, IconLayers, IconPattern } from './Icons'

import './Proposition.css'

const POINTS = [
  'Market and indicator data held in one structured place',
  'Patterns surfaced with the conditions that triggered them',
  'Risk context attached to every finding, not bolted on after',
  'A plain-language rationale beside each result',
]

const STAGES = [
  {
    icon: IconLayers,
    title: 'Assemble',
    text: 'Market data and derived indicators are gathered and normalised into a single structured store, with each source recorded separately.',
  },
  {
    icon: IconPattern,
    title: 'Detect',
    text: 'Pattern detection runs across the assembled data. Each match keeps the conditions that defined it rather than discarding them.',
  },
  {
    icon: IconDoc,
    title: 'Explain',
    text: 'Results are published with a written rationale assembled from those recorded conditions, not reconstructed from memory afterwards.',
  },
]

/**
 * Positioning section: what Forge Capmoor actually is.
 *
 * Layout is deliberately asymmetric — text on the left, a vertical three-stage
 * rail on the right — so it does not repeat the centred rhythm used by the
 * principles strip above it and the capabilities grid below.
 */
export function Proposition() {
  return (
    <section className="section proposition" aria-labelledby="proposition-title">
      <div className="container container--wide proposition__inner">
        <div className="proposition__text">
          <SectionHead
            align="start"
            eyebrow="What it is"
            id="proposition-title"
            title="From market data to a trade you can defend"
            lead="Most platforms hand you a call and stop there. Forge Capmoor shows the working behind every trade: which inputs it used, which conditions were met, and which were not."
          />

          <Reveal as="ul" className="proposition__points" delay={120}>
            {POINTS.map((point) => (
              <li key={point} className="proposition__point">
                <span className="proposition__tick" aria-hidden="true">
                  <IconCheck size={14} />
                </span>
                {point}
              </li>
            ))}
          </Reveal>
        </div>

        <ol className="proposition__rail">
          {STAGES.map((stage, index) => {
            const Icon = stage.icon
            return (
              <Reveal
                as="li"
                key={stage.title}
                delay={index * 110}
                className="proposition__stage"
              >
                <span className="proposition__stage-marker" aria-hidden="true">
                  <Icon size={20} />
                </span>

                <div className="proposition__stage-body">
                  <h3 className="proposition__stage-title">
                    <span className="proposition__stage-index">0{index + 1}</span>
                    {stage.title}
                  </h3>
                  <p className="proposition__stage-text">{stage.text}</p>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default Proposition
