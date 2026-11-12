import { Reveal } from './Reveal'
import { ForgeMark } from './Icons'
import { SignUpForm } from './SignUpForm'
import { SECTION_IDS } from '../lib/navigation'

import './FinalCTA.css'

/**
 * Closing call to action.
 *
 * A thin wrapper: the form itself lives in SignUpForm, so this band, the
 * /signup page and the /contact page cannot drift apart. All this file owns is
 * the framing - the mark, the headline, the lead and the microcopy.
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
          Trade Your Next Move With Purpose
        </Reveal>

        <Reveal as="p" className="cta__lead" delay={110}>
          Sign up with Forge Capmoor and get research-backed signals that explain
          themselves, while every trade decision stays yours.
        </Reveal>

        <Reveal className="cta__form-wrap" delay={160}>
          <SignUpForm tone="dark" submitLabel="Join Free Now" />
        </Reveal>

        <Reveal as="p" className="cta__micro" delay={200}>
          Sign up in 2 minutes · Zero joining cost
        </Reveal>
      </div>
    </section>
  )
}

export default FinalCTA
