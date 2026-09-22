import { PageHero } from '../components/PageHero'
import { Placeholder } from '../components/Placeholder'
import { SignUpForm } from '../components/SignUpForm'
import { IconClock, IconMail, IconPin } from '../components/Icons'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { LEGAL_PLACEHOLDERS } from '../lib/legal'

import '../styles/pages.css'

/**
 * Contact.
 *
 * The address, email and hours are placeholders. A made-up inbox would bounce
 * and a made-up street address would be worse than useless, so the three cards
 * say plainly what still has to be filled in — see lib/legal.js. The form
 * below them is real and validated.
 */
const REACH = [
  {
    Icon: IconMail,
    label: 'Email',
    value: LEGAL_PLACEHOLDERS.email,
    note: 'For anything account-related, including a question about a specific trade or withdrawal.',
  },
  {
    Icon: IconClock,
    label: 'Support hours',
    value: LEGAL_PLACEHOLDERS.hours,
    note: 'Anything that arrives outside these hours is queued and answered in the order it was received.',
  },
  {
    Icon: IconPin,
    label: 'Registered office',
    value: LEGAL_PLACEHOLDERS.office,
    note: 'A correspondence address only. Our licence and registration details are set out in the terms of use.',
  },
]

export default function Contact() {
  useDocumentMeta({
    title: 'Contact us | Forge Capmoor',
    description:
      'Get in touch with Forge Capmoor about an account, a withdrawal, or something the platform did. Send a message or leave your details and we will come back to you.',
    path: '/contact',
  })

  return (
    <article className="section page">
      <div className="container">
        <PageHero
          eyebrow="Contact"
          title="Ask us anything, including the awkward questions"
          lead="Questions about an account, a withdrawal, or an action the system took, send them through and they reach a person who can see the same record you can."
        />

        <div className="page__body">
          <div className="tiles">
            {REACH.map(({ Icon, label, value, note }) => (
              <div key={label} className="tile">
                <span className="tile__icon">
                  <Icon size={22} />
                </span>
                <h2 className="tile__label">{label}</h2>
                <p className="tile__value">
                  <Placeholder>{value}</Placeholder>
                </p>
                <p className="tile__text">{note}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="page__section">
          <div className="page__form-head">
            <h2 className="page__section-title">Or leave your details</h2>
            <p className="page__section-lead">
              Fill this in and we will come back to you to open the account and set your automation
              preferences.
            </p>
          </div>

          <SignUpForm tone="light" submitLabel="Create an account" />
        </section>
      </div>
    </article>
  )
}
