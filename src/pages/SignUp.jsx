import { PageHero } from '../components/PageHero'
import { SignUpForm } from '../components/SignUpForm'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

import '../styles/pages.css'

const NEXT = [
  {
    title: 'We confirm your details',
    text: 'We check what you have given us, and we may ask for identification before the account is opened. That is a legal requirement rather than a preference, and it applies to everyone.',
  },
  {
    title: 'You fund the account',
    text: 'Deposits are made through the platform, and the payment methods available to you are shown before you commit to anything. Nothing is charged for opening an account.',
  },
  {
    title: 'You decide how much runs itself',
    text: 'Automation stays off until you switch it on. You can run everything yourself, take the analysis without the execution, or let the system trade, and change your mind at any point.',
  },
]

export default function SignUp() {
  useDocumentMeta('/signup')

  return (
    <article className="section page">
      <div className="container">
        <PageHero
          eyebrow="Create an account"
          title="Open your account"
          lead="A short form, then a conversation. Nothing is funded and nothing trades until you have been through both."
        />

        <div className="page__section">
          <div className="split">
            <div>
              <h2 className="page__section-title">What happens next</h2>

              <ol className="steps page__section-body">
                {NEXT.map((step, index) => (
                  <li key={step.title} className="steps__item">
                    <span className="steps__num" aria-hidden="true">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="steps__title">{step.title}</h3>
                      <p className="steps__text">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="split__note">
                Before you fund anything, read the risk disclosure. It sets out what can go wrong,
                including losing the capital you commit, and it is the shortest document on this
                site that actually matters.
              </p>
            </div>

            <div className="split__panel">
              <h2 className="split__panel-title">Your details</h2>
              <SignUpForm tone="light" submitLabel="Create an account" />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
