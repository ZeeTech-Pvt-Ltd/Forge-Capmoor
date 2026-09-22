import { Link } from '../lib/router'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { FaqAccordion } from './FaqAccordion'
import { IconArrowRight } from './Icons'
import { FAQ_ITEMS } from '../lib/faq'
import { SECTION_IDS } from '../lib/navigation'

import './FAQ.css'

/** Enough to answer the obvious questions without turning the page into a manual. */
const TEASER_COUNT = 3

/**
 * The homepage slice of the FAQ.
 *
 * Deliberately emits no FAQPage structured data. The full set lives on /faq
 * and carries the schema there; publishing the same FAQPage on two URLs is
 * duplicate structured data and gets rich results suppressed rather than
 * doubled. So the teaser shows questions and links out.
 */
export function FaqTeaser() {
  return (
    <section id={SECTION_IDS.faq} className="section faq" aria-labelledby="faq-title">
      <div className="container">
        <SectionHead
          eyebrow="Questions"
          id="faq-title"
          title="Answers, and the limits of them"
          lead="If something here is not answered, it is more likely to be a question we cannot answer yet than one we are avoiding."
        />

        <FaqAccordion items={FAQ_ITEMS} limit={TEASER_COUNT} />

        <Reveal className="faq__more" delay={200}>
          <Link to="/faq" className="btn btn--secondary">
            See all questions
            <IconArrowRight size={18} className="btn__icon" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export default FaqTeaser
