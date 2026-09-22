import { Reveal } from './Reveal'
import { IconPlus } from './Icons'

import './FAQ.css'

/**
 * FAQ accordion.
 *
 * Built on native <details>/<summary> rather than a JS-controlled accordion:
 * it is keyboard operable and screen-reader announced before a single line of
 * script runs, it works if the bundle fails to load, and it needs no
 * aria-expanded bookkeeping to stay in sync.
 *
 * `limit` caps how many questions render — the homepage shows a short teaser
 * and links to /faq for the rest, from this one implementation.
 */
export function FaqAccordion({ items, limit, flush = false }) {
  const shown = typeof limit === 'number' ? items.slice(0, limit) : items

  return (
    <div className={`faq__list${flush ? ' faq__list--flush' : ''}`}>
      {shown.map((item, index) => (
        <Reveal key={item.question} delay={index * 60}>
          <details className="faq__item">
            <summary className="faq__question">
              <span className="faq__question-text">{item.question}</span>
              <span className="faq__indicator" aria-hidden="true">
                <IconPlus size={18} />
              </span>
            </summary>
            <div className="faq__answer">
              <p>{item.answer}</p>
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  )
}

export default FaqAccordion
