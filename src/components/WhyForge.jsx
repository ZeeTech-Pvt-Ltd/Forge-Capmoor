import { Link } from '../lib/router'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'

import './WhyForge.css'

const REASONS = [
  {
    title: 'Clarity first',
    text: 'Short sentences, simple terms and no trader slang.',
  },
  {
    title: 'Less screen time',
    text: 'Skip the hours of chart watching while we do the heavy lifting.',
  },
  {
    title: 'Speed that counts',
    text: 'Alerts go out as soon as a setup is confirmed.',
  },
  {
    title: 'Help when you need it',
    text: 'Our support team is just a message away on chat or email.',
  },
]

/**
 * Why choose us.
 *
 * Two columns with the heading pinned on the left while the reasons scroll
 * past it - a slower, editorial rhythm that gives the page a pause before the
 * getting-started steps.
 */
export function WhyForge() {
  return (
    <section className="section why" aria-labelledby="why-title">
      <div className="container container--wide why__inner">
        <div className="why__head">
          <SectionHead
            align="start"
            eyebrow="Why choose us"
            id="why-title"
            title="Why Choose Us"
          />
        </div>

        <ol className="why__list">
          {REASONS.map((reason, index) => (
            <Reveal as="li" key={reason.title} delay={index * 100} className="why__item">
              <span className="why__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="why__item-title">{reason.title}</h3>
              <p className="why__item-text">{reason.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="why__action" delay={200}>
          <Link to="/signup" className="btn btn--primary">
            Start With Forge Capmoor
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export default WhyForge
