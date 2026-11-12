import { Link } from '../lib/router'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { SECTION_IDS } from '../lib/navigation'
import { IconDoc, IconEye, IconLock, IconShield } from './Icons'
import { ProvenanceArt } from './TradingArt'

import './Technology.css'

const POINTS = [
  {
    icon: IconLock,
    title: 'Data protection',
    text: 'Encryption safeguards your personal and payment information.',
  },
  {
    icon: IconShield,
    title: 'Secure sign-in',
    text: 'Two-factor authentication adds an extra lock to your account.',
  },
  {
    icon: IconDoc,
    title: 'Honest pricing',
    text: 'All fees are disclosed upfront.',
  },
  {
    icon: IconEye,
    title: 'Your call, always',
    text: 'Nothing is traded without your go-ahead.',
  },
]

/**
 * Security and transparency - the one full-bleed dark band on the page.
 *
 * The four commitments sit beside the drawing that shows records and the
 * reasoning spine, then the document's risk notice and its CTA close the
 * section.
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
          <SectionHead align="start" id="tech-title" title="Security & Transparency" />

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

          <p className="tech__risk">
            Trading is risky, and you could lose some or all of your capital. Forge Capmoor
            signals are for guidance only, and results are never guaranteed.
          </p>

          <Link to="/signup" className="btn btn--primary tech__action">
            Create a Protected Account
          </Link>
        </div>

        <Reveal className="tech__visual" delay={140}>
          <ProvenanceArt className="tech__art" />
        </Reveal>
      </div>
    </section>
  )
}

export default Technology
