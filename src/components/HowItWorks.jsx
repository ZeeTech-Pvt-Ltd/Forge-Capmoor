import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { SECTION_IDS } from '../lib/navigation'

import './HowItWorks.css'

const STEPS = [
  {
    title: 'Scanning',
    text: 'We monitor charts, trends and economic events throughout the trading day.',
  },
  {
    title: 'Filtering',
    text: 'Only setups with a clear direction and a defined risk make the cut.',
  },
  {
    title: 'Sending',
    text: 'The alert lands on your device with every level you need and a quick explanation.',
  },
  {
    title: 'Deciding',
    text: 'You weigh it up and choose to trade it, modify it or ignore it.',
  },
]

/**
 * How the signals work, as a horizontal four-step track.
 *
 * The connector is a dashed rule behind the numbered nodes rather than
 * borders on the cards, so the four steps read as one process instead of
 * four separate boxes.
 */
export function HowItWorks() {
  return (
    <section
      id={SECTION_IDS.howItWorks}
      className="section section--surface how"
      aria-labelledby="how-title"
    >
      <div className="container container--wide">
        <SectionHead
          eyebrow="How it works"
          id="how-title"
          title="How Forge Capmoor Signals Work"
        />

        <ol className="how__track">
          {STEPS.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 90} className="how__step">
              <span className="how__node">
                <span className="how__num">{String(index + 1).padStart(2, '0')}</span>
              </span>

              <div className="how__body">
                <h3 className="how__step-title">{step.title}</h3>
                <p className="how__step-text">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default HowItWorks
