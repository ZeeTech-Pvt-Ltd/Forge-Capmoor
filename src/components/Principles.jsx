import { Reveal } from './Reveal'

import './Principles.css'

/**
 * The credibility strip that sits directly under the hero.
 *
 * This is the slot where this kind of site would normally show a row of
 * customer or partner logos. We have no such relationships to show, and
 * inventing them would be a lie — so the space carries the four commitments
 * the product is actually built around instead.
 */
const PRINCIPLES = [
  {
    title: 'Evidence over opinion',
    text: 'Every conclusion links back to the inputs that produced it.',
  },
  {
    title: 'Context over signals',
    text: 'A pattern without its conditions is not a finding.',
  },
  {
    title: 'Clarity over volume',
    text: 'Fewer outputs, and each one defensible.',
  },
  {
    title: 'Control over automation',
    text: 'Automation is an instruction you give, not one you lose. Any strategy can be paused at any time.',
  },
]

export function Principles() {
  return (
    <section className="principles" aria-labelledby="principles-title">
      <div className="container container--wide">
        <Reveal as="h2" className="principles__title" id="principles-title">
          Built around four commitments
        </Reveal>

        <ul className="principles__list">
          {PRINCIPLES.map((principle, index) => (
            <Reveal
              as="li"
              key={principle.title}
              delay={index * 70}
              className="principles__item"
            >
              <h3 className="principles__item-title">{principle.title}</h3>
              <p className="principles__item-text">{principle.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Principles
