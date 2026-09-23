import { PageHero } from '../components/PageHero'
import { ChartArt } from '../components/TradingArt'
import { SignUpForm } from '../components/SignUpForm'
import { IconClock, IconMail, IconPin } from '../components/Icons'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

import '../styles/pages.css'

/**
 * Contact.
 *
 * The three details below were placeholders until the site owner supplied
 * them. They are values now, not tokens — `Placeholder` is deliberately not
 * wrapping them, because a marked-up bracket here would say the detail is still
 * missing when it is not.
 *
 * They are still not in lib/legal.js. That file holds the values a regulator
 * reads, including a *registered office*, which needs a street address rather
 * than a city: "Melbourne, Victoria, Australia" is where the business is, not
 * the address on a filing. The legal pages keep their own placeholder until
 * that address arrives.
 */
const REACH = [
  {
    Icon: IconMail,
    label: 'Email',
    value: 'support@forge-capmoor.net',
    note: 'Replies within a few hours.',
  },
  {
    Icon: IconClock,
    label: 'Support hours',
    value: '24/7, 365 days a year',
    note: 'Round-the-clock assistance.',
  },
  {
    Icon: IconPin,
    label: 'Location',
    value: 'Melbourne, Victoria, Australia',
    note: 'Serving traders across Australia.',
  },
]

export default function Contact() {
  useDocumentMeta('/contact')

  return (
    <article className="section page">
      <div className="container">
        <div className="contact__hero">
          <div className="contact__hero-bg" aria-hidden="true">
            <ChartArt />
          </div>

          <div className="contact__hero-text">
            <PageHero
              variant="prominent"
              eyebrow="Contact"
              title="Ask us anything, including the awkward questions"
              lead="Questions about an account, a withdrawal, or an action the system took, send them through and they reach a person who can see the same record you can."
            />
          </div>
        </div>

        <div className="page__body">
          <div className="tiles">
            {REACH.map(({ Icon, label, value, note }) => (
              <div key={label} className="tile">
                <span className="tile__icon">
                  <Icon size={22} />
                </span>
                <h2 className="tile__label">{label}</h2>
                <p className="tile__value">{value}</p>
                <p className="tile__text">{note}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="page__section">
          <div className="page__form-head">
            <h2 className="page__section-title">Leave your details</h2>
            <p className="page__section-lead">
              Fill this in and we will come back to you to open the account and set your automation
              preferences.
            </p>
          </div>

          <div className="contact__form-card">
            <SignUpForm tone="light" submitLabel="Create an account" />
          </div>
        </section>
      </div>
    </article>
  )
}
