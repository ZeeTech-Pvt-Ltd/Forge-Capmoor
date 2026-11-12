import { Reveal } from './Reveal'

import './Principles.css'

/**
 * Quick highlights.
 *
 * Four short statements from the content document. They carry no supporting
 * paragraph of their own, so the cards are title-only rather than padded with
 * copy the document does not supply.
 */
const PRINCIPLES = [
  { title: 'Four major markets in one dashboard' },
  { title: 'A plain-language note with every trade idea' },
  { title: 'Works on any screen, big or small' },
  { title: 'Risk settings that stay in your hands' },
]

export function Principles() {
  return (
    <section className="principles" aria-labelledby="principles-title">
      <div className="container container--wide">
        <Reveal as="h2" className="principles__title" id="principles-title">
          Quick Highlights
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
              {principle.text ? (
                <p className="principles__item-text">{principle.text}</p>
              ) : null}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Principles
