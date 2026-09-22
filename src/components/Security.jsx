import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { SECTION_IDS } from '../lib/navigation'
import { IconClock, IconLock, IconShield } from './Icons'

import './Security.css'

/**
 * Security, in the three places it can actually be stated.
 *
 * Sourced from the reference site's "Security first" section, but only the
 * parts of it that Forge Capmoor can stand behind. That section carries four
 * further claims which are deliberately absent here:
 *
 *   - "98% of funds in cold storage" — cold storage is a cryptocurrency
 *     custody model. This platform holds client money in a client money
 *     account, which is a different structure, so importing the figure would
 *     describe a system that is not the one being used.
 *   - "KYC & AML compliant" — a regulatory claim, and not one that was
 *     confirmed, so it is left out rather than asserted.
 *   - "no hidden fees", "no subscription fee" — pricing terms. They belong to
 *     whoever sets the prices, not to this file.
 *   - "4.7/5 trader rating", "85% accuracy" — unverifiable, and the brief
 *     rules out performance figures entirely.
 *
 * What remains is three statements with nothing numeric in them except the
 * encryption standard. If any of those stops being true, this section has to
 * change with it — it is a description of how the platform works, not
 * reassurance.
 */
const CARDS = [
  {
    icon: IconShield,
    // Deliberately not the wording used by the capabilities grid, which already
    // states where the money is held. Repeating it here would put the same
    // paragraph on the page twice; this says what the separation is actually
    // for, including its limit.
    title: 'What segregation does, and does not do',
    text: 'Client funds are held in a client money account, separate from the funds Forge Capmoor operates on. That separation addresses one specific risk: that a failure of the firm takes your balance with it. It does not protect you against market losses, which remain yours.',
  },
  {
    icon: IconLock,
    title: 'Encryption and two-factor authentication',
    text: 'Connections to the platform and the transactions you make over them are encrypted in transit with 256-bit encryption. Two-factor authentication is required for logins and for withdrawals, so a password on its own is not enough to move money.',
  },
  {
    icon: IconClock,
    title: 'Support at any hour',
    text: 'Support is staffed around the clock rather than only during market hours, because the platform runs around the clock and a question rarely arrives at a convenient time.',
  },
]

/**
 * Where the money sits, and how the account is protected.
 *
 * Placed after the Technology band and before the Benefits rows: the page has
 * just described what the platform does and what it runs on, and this answers
 * the question a reader asks next. A three-card row keeps it from repeating
 * the split layout above it or the alternating rows below.
 */
export function Security() {
  return (
    <section id={SECTION_IDS.security} className="section security" aria-labelledby="security-title">
      <div className="container container--wide">
        <SectionHead
          eyebrow="Security"
          id="security-title"
          title="Where your money sits, and how the account is protected"
          lead="Three things stated plainly: how client funds are held, how the account is secured, and when you can reach someone."
        />

        <div className="security__grid">
          {CARDS.map((card, index) => (
            <Reveal key={card.title} className="security__card" delay={index * 90}>
              <span className="security__icon" aria-hidden="true">
                <card.icon size={22} />
              </span>
              <h3 className="security__card-title">{card.title}</h3>
              <p className="security__card-text">{card.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Security
