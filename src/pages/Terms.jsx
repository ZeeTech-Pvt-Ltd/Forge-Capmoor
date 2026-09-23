import { LegalPage } from '../components/LegalPage'
import { Placeholder } from '../components/Placeholder'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { LAWYER_REVIEW_NOTE, LEGAL_PLACEHOLDERS } from '../lib/legal'

const UPDATED = '21 September 2026'

/**
 * Terms of use.
 *
 * Section 02 is where the regulated identities belong, and every one of them
 * is a placeholder: the entity that operates this platform, its AFS Licence
 * number, its ABN or ACN, and the jurisdiction whose courts hear a dispute.
 * Those are facts about a real company, and a fabricated AFSL number is a
 * false regulatory claim rather than a missing detail.
 *
 * Section 07 exists because the platform places trades on a client's behalf.
 * That is an instruction from the client, not advice from us, and the terms
 * have to say so in as many words.
 */
const SECTIONS = [
  {
    heading: 'These terms',
    paragraphs: [
      'These terms govern your access to and use of the Forge Capmoor website and platform (the “Service”). By creating an account, or by using the Service in any other way, you confirm that you have read these terms, that you understand them, and that you agree to be bound by them, together with our privacy policy and our risk disclosure.',
      'If you do not agree with any part of them, you must not register for or use the Service.',
    ],
  },
  {
    heading: 'Who you are dealing with',
    paragraphs: [
      <>
        The Service is operated by <Placeholder>{LEGAL_PLACEHOLDERS.entity}</Placeholder>, holder
        of Australian Financial Services Licence{' '}
        <Placeholder>{LEGAL_PLACEHOLDERS.afsl}</Placeholder>, ABN{' '}
        <Placeholder>{LEGAL_PLACEHOLDERS.abn}</Placeholder>, with its registered office at{' '}
        <Placeholder>{LEGAL_PLACEHOLDERS.office}</Placeholder>.
      </>,
      'Those bracketed values are placeholders, not drafting errors. They must be completed before these terms are relied on by anyone.',
    ],
  },
  {
    heading: 'Eligibility',
    paragraphs: [
      'The Service is available to individuals who are at least 18 years old and who are able to form a legally binding contract. By using it you confirm that you meet those requirements, and that your use of the Service is lawful in the country or state where you live.',
      'We may decline to open an account, or close one, where we cannot satisfy ourselves on either point.',
    ],
  },
  {
    heading: 'Nature of the service',
    paragraphs: [
      'Forge Capmoor provides trading technology and execution services. It analyses market data and, where you have enabled it, places trades on your account in line with the strategy you have selected.',
      'The Service is not personal financial advice. Nothing on it, including AI-generated analysis, signals, or any other content, is a recommendation, an offer, or a solicitation to buy or sell any financial instrument, and none of it takes account of your objectives, financial situation or needs. Forge Capmoor is not acting as your adviser.',
      'Any decision you make, and the outcome of it, remains your responsibility.',
    ],
  },
  {
    heading: 'Account registration and security',
    paragraphs: [
      'You agree to give accurate, current and complete information when you register, and to keep it up to date. You are responsible for keeping your credentials confidential and for everything that happens under your account.',
      'Tell us immediately if you suspect anyone else has access to your account. We may suspend an account while we investigate a suspected compromise.',
    ],
  },
  {
    heading: 'Deposits and withdrawals',
    paragraphs: [
      'Deposits and withdrawals are made through the platform. The payment methods available to you, and the arrangements that apply to a transaction, are shown before you commit to it.',
      'We may require additional identity verification before processing a withdrawal, and we may be required to delay or decline a transaction where the law obliges us to. Withdrawals are returned through the same channel by which the funds arrived.',
    ],
  },
  {
    heading: 'Automated trading and your instructions',
    paragraphs: [
      'When you enable automated trading, you are instructing us to place trades on your account in accordance with the strategy you have selected. That instruction is yours. It does not originate from us, it is not a recommendation, and enabling it does not make Forge Capmoor your adviser.',
      'You may pause or disable automation at any time. A change takes effect on trades not yet placed. You are responsible for the strategy settings you choose, and for the periods during which automation runs.',
    ],
  },
  {
    heading: 'Fees',
    paragraphs: [
      'Any fee that applies to a transaction is shown before you commit to it, and no fee is charged without your authorisation. We may change our fees from time to time, and where the law requires notice of a change we will give it.',
    ],
  },
  {
    heading: 'Acceptable use',
    paragraphs: ['Please do not:'],
    bullets: [
      'attempt to disrupt the Service, or to reach any part of it you have not been given access to',
      'use automated means to extract data or content from the Service at scale',
      'use the Service in a way that breaks the law, or that misrepresents Forge Capmoor or its output',
      'open an account in someone else’s name, or on someone else’s behalf without authority to do so',
    ],
  },
  {
    heading: 'Intellectual property',
    paragraphs: [
      'The Service, and everything made available through it, is owned by or licensed to Forge Capmoor and is protected by intellectual property law.',
      'You may not copy, modify, distribute or create derivative works from any part of the Service without our prior written consent. Your own account data and transaction records remain yours.',
    ],
  },
  {
    heading: 'Third-party services',
    paragraphs: [
      'The Service may link to, or rely on, services operated by other companies: payment providers, identity verification and hosting among them. We are not responsible for the content, availability or practices of those services, and your use of them may be governed by their own terms.',
    ],
  },
  {
    heading: 'Disclaimers',
    paragraphs: [
      'The Service is provided on an “as is” and “as available” basis. To the maximum extent the law permits, we disclaim all warranties, express or implied, including any warranty of fitness for a particular purpose, accuracy, or non-infringement.',
      'We do not warrant that the Service will be uninterrupted, error-free or secure, or that any analysis or signal it produces will be correct.',
    ],
  },
  {
    heading: 'Limitation of liability',
    paragraphs: [
      'To the maximum extent the law permits, Forge Capmoor and its officers, employees and affiliates are not liable for any indirect, incidental, special or consequential loss, or for any loss of profit, data or goodwill, arising out of or in connection with your use of the Service.',
      'Nothing in these terms excludes or limits any liability that cannot lawfully be excluded or limited, including under the Australian Consumer Law.',
    ],
  },
  {
    heading: 'Suspension and termination',
    paragraphs: [
      'We may suspend or close your access to the Service where we reasonably believe you have breached these terms or the law, where we are required to by a regulator, or where we cannot continue to provide the Service to you lawfully.',
      'You may close your account at any time. Closing it does not affect any obligation that arose before it closed.',
    ],
  },
  {
    heading: 'Changes to these terms',
    paragraphs: [
      'We may update these terms. The revised version appears on this page with a new “Last updated” date, and continued use of the Service after a change takes effect is acceptance of it. Where a change is material, we will give notice through the platform.',
    ],
  },
  {
    heading: 'Governing law',
    paragraphs: [
      <>
        These terms are governed by the laws of Australia. The courts of{' '}
        <Placeholder>{LEGAL_PLACEHOLDERS.jurisdiction}</Placeholder> have exclusive jurisdiction
        over any dispute arising out of or in connection with them.
      </>,
    ],
  },
]

export default function Terms() {
  useDocumentMeta('/terms')

  return (
    <LegalPage
      title="Terms of use"
      updated={UPDATED}
      intro="The rules that govern your use of this platform, written in the same plain language as everything else here. Where a clause depends on a detail we have not yet been given, that detail is marked rather than guessed at."
      sections={SECTIONS}
      note={LAWYER_REVIEW_NOTE}
    />
  )
}
