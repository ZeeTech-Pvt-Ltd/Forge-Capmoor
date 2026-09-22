import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { SECTION_IDS } from '../lib/navigation'

import './HowItWorks.css'

const STEPS = [
  {
    title: 'Open an account',
    text: 'Registration takes a few details and an identity check. What is required is listed before you begin, so nothing arrives as a surprise halfway through.',
  },
  {
    title: 'Fund it',
    text: 'Deposits are made through the platform. The methods available to you, and the arrangements that apply, are shown before you commit to a transaction, and withdrawals go back the same way they came in.',
  },
  {
    title: 'Turn trading on',
    text: 'Choose a strategy and the platform places trades on your account in line with it. Every action keeps its reasoning attached, and you can pause automation whenever you want.',
  },
]

/**
 * How the platform works, as a horizontal three-step track.
 *
 * The connector is a dashed rule behind the numbered nodes rather than
 * borders on the cards, so the three steps read as one process instead of
 * three separate boxes.
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
          title="Three steps, and the reasoning survives every trade"
          lead="The order matters. Each stage hands the next everything it recorded, so no trade has to be explained after the fact."
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
