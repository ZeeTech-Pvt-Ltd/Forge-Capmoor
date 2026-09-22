import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'

import './WhyForge.css'

const REASONS = [
  {
    title: 'The reasoning is the product',
    text: 'A conclusion you cannot explain does not survive a review. Here the explanation is part of the output, not a paragraph written afterwards to make it sound considered.',
  },
  {
    title: 'Built to be questioned',
    text: 'Every figure links back to the source that produced it. Disagree with a finding and you can follow it down to the input, then argue with the input instead of with the software.',
  },
  {
    title: 'Deliberately unexciting about certainty',
    text: 'The platform states what the data supports and flags what it does not. Confidence is not decoration, and we do not manufacture it to make a screen feel more decisive.',
  },
]

/**
 * Why Forge Capmoor.
 *
 * Two columns with the heading pinned on the left while the reasons scroll
 * past it — a slower, editorial rhythm that gives the page a pause before the
 * FAQ and the closing call to action.
 */
export function WhyForge() {
  return (
    <section className="section why" aria-labelledby="why-title">
      <div className="container container--wide why__inner">
        <div className="why__head">
          <SectionHead
            align="start"
            eyebrow="Why Forge Capmoor"
            id="why-title"
            title="Why an explained trade beats another signal feed"
            lead="There is no shortage of places to get a call. The scarce thing is knowing why."
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
      </div>
    </section>
  )
}

export default WhyForge
