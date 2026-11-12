import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { SECTION_IDS } from '../lib/navigation'
import { IconEye, IconGraph, IconLayers, IconShield, IconSignal } from './Icons'

import './Capabilities.css'

const FEATURES = [
  {
    icon: IconEye,
    title: 'Reasoned alerts',
    text: 'No blind calls. Each signal shows the logic behind it.',
  },
  {
    icon: IconShield,
    title: 'Pre-set exits',
    text: 'Every idea comes with its own stop-loss and take-profit.',
  },
  {
    icon: IconSignal,
    title: 'Target alerts',
    text: 'Set a price and get a ping when the market hits it.',
  },
  {
    icon: IconGraph,
    title: 'At-a-glance dashboard',
    text: 'Track your balance, positions and performance in one place.',
  },
  {
    icon: IconLayers,
    title: 'Any-device access',
    text: 'Open Forge Capmoor in your browser and trade, with nothing to install.',
  },
]

/**
 * Features as a card grid.
 *
 * Five equal cards, so the row rhythm stays even and no card is given weight
 * the document does not ask for.
 */
export function Capabilities() {
  return (
    <section
      id={SECTION_IDS.capabilities}
      className="section cap"
      aria-labelledby="cap-title"
    >
      <div className="container container--wide">
        <SectionHead id="cap-title" title="Features" />

        <div className="cap__grid">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Reveal
                key={feature.title}
                delay={(index % 3) * 80}
                className={`cap-card ${index < 2 ? 'cap-card--half' : 'cap-card--third'}`}
              >
                <span className="cap-card__icon" aria-hidden="true">
                  <Icon size={22} />
                </span>

                <div className="cap-card__body">
                  <h3 className="cap-card__title">{feature.title}</h3>
                  <p className="cap-card__text">{feature.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Capabilities
