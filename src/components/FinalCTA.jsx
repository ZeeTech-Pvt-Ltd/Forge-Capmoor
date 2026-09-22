import { Reveal } from './Reveal'
import { ForgeMark } from './Icons'
import { SignUpForm } from './SignUpForm'
import { SECTION_IDS } from '../lib/navigation'

import './FinalCTA.css'

/**
 * Closing call to action.
 *
 * A thin wrapper now: the form itself lives in SignUpForm, so this band, the
 * /signup page and the /contact page cannot drift apart. All this file owns is
 * the framing — the mark, the headline and the lead.
 */
export function FinalCTA() {
  return (
    <section
      id={SECTION_IDS.getStarted}
      className="section section--dark cta"
      aria-labelledby="cta-title"
    >
      <div className="cta__glow" aria-hidden="true" />

      <div className="container container--narrow cta__inner">
        <Reveal className="cta__mark">
          <ForgeMark size={62} variant="stroke" />
        </Reveal>

        <Reveal as="h2" className="cta__title" id="cta-title" delay={60}>
          Start trading with the reasoning attached
        </Reveal>

        <Reveal as="p" className="cta__lead" delay={110}>
          Open an account and every trade arrives with its working: what was read,
          which condition was met, and what the risk looked like at the time. You can check any of
          it, and you can turn automation off whenever you want.
        </Reveal>

        <Reveal className="cta__form-wrap" delay={160}>
          <SignUpForm tone="dark" submitLabel="Create an account" />
        </Reveal>
      </div>
    </section>
  )
}

export default FinalCTA
