import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { IconClock, IconEye, IconGauge } from './Icons'

import './Benefits.css'

const AUDIENCES = [
  {
    icon: IconEye,
    title: 'Newcomers',
    text: 'Start small and learn something from every explained alert.',
  },
  {
    icon: IconClock,
    title: 'People with busy schedules',
    text: 'Check in for a few minutes and still catch the key moves.',
  },
  {
    icon: IconGauge,
    title: 'Active traders',
    text: 'Use our signals to confirm your own analysis or uncover fresh setups.',
  },
]

/**
 * Who it is for, as three equal cards.
 *
 * The previous alternating rows left each one-sentence audience beside a large
 * image with a lot of empty space. A card grid gives the three audiences the
 * same weight and keeps the section compact.
 */
export function Benefits() {
  return (
    <section className="section benefits" aria-labelledby="benefits-title">
      <div className="container container--wide">
        <SectionHead id="benefits-title" title="Who It’s For" />

        <div className="who__grid">
          {AUDIENCES.map((audience, index) => {
            const Icon = audience.icon
            return (
              <Reveal key={audience.title} className="who-card" delay={index * 80}>
                <span className="who-card__icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <h3 className="who-card__title">{audience.title}</h3>
                <p className="who-card__text">{audience.text}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Benefits
