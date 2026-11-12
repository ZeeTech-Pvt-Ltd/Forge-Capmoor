import { SectionHead } from './SectionHead'
import { FaqAccordion } from './FaqAccordion'
import { FAQ_ITEMS } from '../lib/faq'
import { SECTION_IDS } from '../lib/navigation'

import './FAQ.css'

/**
 * The homepage FAQ.
 *
 * The document supplies all nine questions, so all nine render here. The
 * accordion keeps the page compact while nothing is hidden from a reader who
 * wants an answer.
 *
 * Deliberately emits no FAQPage structured data; the full set lives on /faq
 * and carries the schema there.
 */
export function FaqTeaser() {
  return (
    <section id={SECTION_IDS.faq} className="section faq" aria-labelledby="faq-title">
      <div className="container">
        <SectionHead id="faq-title" title="FAQs" />

        <FaqAccordion items={FAQ_ITEMS} />
      </div>
    </section>
  )
}

export default FaqTeaser
