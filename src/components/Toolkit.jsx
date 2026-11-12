import { Link } from '../lib/router'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { SECTION_IDS } from '../lib/navigation'
import { IconGauge, IconLock, IconShield, IconSignal } from './Icons'

import './Toolkit.css'

/**
 * How to get started, as four cards.
 *
 * The document supplies the four steps and the "Four Steps to Your First
 * Signal" subheading; this section renders exactly those, with the CTA that
 * follows them in the document.
 */
const STEPS = [
  {
    icon: IconSignal,
    title: 'Create an account',
    text: 'Share your name, email and phone number.',
  },
  {
    icon: IconShield,
    title: 'Complete verification',
    text: 'Upload your ID to keep your account safe and protected.',
  },
  {
    icon: IconLock,
    title: 'Deposit funds',
    text: 'Choose the payment method that suits you.',
  },
  {
    icon: IconGauge,
    title: 'Trade with a plan',
    text: 'Select your markets, set your risk limits and review your first alert.',
  },
]

export function Toolkit() {
  return (
    <section
      id={SECTION_IDS.toolkit}
      className="section section--surface toolkit"
      aria-labelledby="toolkit-title"
    >
      <div className="container container--wide">
        <SectionHead
          eyebrow="Get started"
          id="toolkit-title"
          title="How to Get Started"
          lead="Four Steps to Your First Signal"
        />

        <div className="toolkit__grid">
          {STEPS.map((step, index) => (
            <Reveal key={step.title} className="toolkit__card" delay={index * 70}>
              <span className="toolkit__icon" aria-hidden="true">
                <step.icon size={22} />
              </span>
              <h3 className="toolkit__card-title">{step.title}</h3>
              <p className="toolkit__card-text">{step.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="toolkit__action" delay={220}>
          <Link to="/signup" className="btn btn--primary">
            Sign Me Up
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export default Toolkit
