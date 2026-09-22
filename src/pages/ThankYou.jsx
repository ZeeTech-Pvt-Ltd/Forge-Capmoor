import { Link } from '../lib/router'
import { PageHero } from '../components/PageHero'
import { IconCheck } from '../components/Icons'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

import '../styles/pages.css'

const NEXT = [
  {
    title: 'Someone reads what you sent',
    text: 'Your details go to a person rather than into a queue, and a reply comes back to the address you gave us.',
  },
  {
    title: 'We confirm your details with you',
    text: 'Before an account is opened we will check what you have given us and may ask for identification, which is a legal requirement rather than a preference.',
  },
  {
    title: 'Nothing moves until you say so',
    text: 'No account is funded, and nothing trades, until you have been through those steps and switched automation on yourself. That part stays in your hands.',
  },
]

export default function ThankYou() {
  useDocumentMeta({
    title: 'Thank you | Forge Capmoor',
    description: 'Your details reached us. Here is what happens next.',
    path: '/thank-you',
    // A confirmation page has nothing to offer a search index, and it should
    // never appear as a result for someone who has not submitted anything.
    noindex: true,
  })

  return (
    <section className="section page">
      <div className="container container--narrow page__inner">
        <div className="thanks__mark">
          <IconCheck size={30} />
        </div>

        <PageHero
          center
          eyebrow="Thank you"
          title="Your details are with us"
          lead="That reached us. Here is what happens from this point, so there are no surprises about the order of things."
        />

        <div className="page__section">
          <ol className="steps steps--center">
            {NEXT.map((step, index) => (
              <li key={step.title} className="steps__item">
                <span className="steps__num" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h2 className="steps__title">{step.title}</h2>
                  <p className="steps__text">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="page__actions">
          <Link to="/faq" className="btn btn--primary">
            Read the FAQ
          </Link>
          <Link to="/risk-disclosure" className="btn btn--secondary">
            Read the risk disclosure
          </Link>
        </p>
      </div>
    </section>
  )
}
