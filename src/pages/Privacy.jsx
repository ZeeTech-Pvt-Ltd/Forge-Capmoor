import { LegalPage } from '../components/LegalPage'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { LAWYER_REVIEW_NOTE } from '../lib/legal'

const UPDATED = '21 September 2026'

/**
 * Privacy policy.
 *
 * Two things in here are load-bearing and must be kept true:
 *
 *   1. The form collects a first name, a last name, an email address and a
 *      phone number. Nothing else. If a field is ever added, section 02 has
 *      to change in the same commit.
 *   2. There is no analytics, no advertising pixel, no embed and no cookie on
 *      this site. Section 09 says so plainly rather than borrowing the usual
 *      "we use cookies and similar technologies" wording, which would be a
 *      false statement here. Adding any of those means rewriting section 09
 *      and adding a cookie notice before the first one is set.
 */
const SECTIONS = [
  {
    heading: 'What this policy covers',
    paragraphs: [
      'This policy describes how Forge Capmoor handles personal information collected through forge-capmoor.net. It covers this website and the account enquiry form on it.',
      'It does not cover information you provide once an account is open, which is governed by the account terms and by the identity-verification requirements that apply to it.',
    ],
  },
  {
    heading: 'Information we collect',
    paragraphs: [
      'Only what you choose to send us. The account form collects four things: the first name you type, the last name you type, the email address you type, and the phone number you type.',
      'That is the whole list. We do not record your IP address, we do not build a profile of your visit, and we do not track you across other websites.',
    ],
  },
  {
    heading: 'How we use your information',
    paragraphs: ['We use what you send for three things, and nothing else:'],
    bullets: [
      'to reply to your enquiry and answer anything you asked',
      'to confirm your details and begin opening an account, if you asked us to',
      'to keep a record of that correspondence',
    ],
  },
  {
    heading: 'Legal bases for processing',
    paragraphs: [
      'Where data protection law requires us to identify a basis for processing, we rely on your consent, given when you submit the form, and on our legitimate interest in responding to people who contact us.',
      'If an account is opened, further processing becomes necessary to perform our contract with you and to meet our legal obligations, including identity verification and anti-money-laundering requirements.',
    ],
  },
  {
    heading: 'Sharing',
    paragraphs: [
      'We do not sell your personal information, and we do not share it for advertising.',
      'The only sharing this site performs is sending what you submit through the form to the service that delivers it to us. If that service stores data outside Australia, that transfer is part of delivery and is described in section 10.',
    ],
  },
  {
    heading: 'How long we keep it',
    paragraphs: [
      'We keep enquiry correspondence only for as long as it is useful, to answer you, and to keep a record if you go on to open an account. If you ask us to delete it and there is no legal reason to keep it, we will.',
      'Records connected to an open account are kept for the period the applicable financial records rules require.',
    ],
  },
  {
    heading: 'Security',
    paragraphs: [
      'Traffic to and from this site is served over HTTPS, so what you type into a form is not sent in the clear. Access to enquiry correspondence is limited to the people who need it to reply.',
      'No method of transmission or storage is completely secure, and we would rather say that than claim an absolute guarantee.',
    ],
  },
  {
    heading: 'Your rights',
    paragraphs: [
      'Depending on where you live, you may have the right to ask for a copy of the personal information we hold about you, to have inaccurate information corrected, to have it deleted, to restrict or object to certain processing, and to withdraw consent you have given.',
      'You also have the right to complain to your local data protection authority. To exercise any of these, contact us using the details on the contact page.',
    ],
  },
  {
    heading: 'Cookies and tracking',
    paragraphs: [
      'This site sets no cookies and writes nothing to your browser’s local storage. There is no analytics script, no advertising pixel, no session recorder and no third-party embed on any page.',
      'This is the kind of statement that quietly stops being true when something is added later, so it is worth being explicit: if any of those were ever added, this section would have to be rewritten and a cookie notice would have to appear before the first one was set.',
    ],
  },
  {
    heading: 'International transfers',
    paragraphs: [
      'This site is operated from Australia. Where a delivery service used by the contact form stores data in another country, your information will be transferred there as part of sending it to us.',
      'Where such a transfer happens, we take reasonable steps to ensure the information continues to be handled consistently with this policy.',
    ],
  },
  {
    heading: "Children's privacy",
    paragraphs: [
      'This site is not directed at anyone under 18, and accounts are not available to them. We do not knowingly collect personal information from a minor. If you believe a minor has sent us information, contact us and we will delete it.',
    ],
  },
  {
    heading: 'Changes to this policy',
    paragraphs: [
      'If this policy changes, the revised version appears on this page with a new “Last updated” date. Material changes that affect what we do with information you have already sent will be described rather than made silently.',
    ],
  },
  {
    heading: 'Contact us',
    paragraphs: [
      'Questions about this policy, or a request to exercise any of the rights in section 08, can be sent using the details on the contact page.',
    ],
  },
]

export default function Privacy() {
  useDocumentMeta('/privacy')

  return (
    <LegalPage
      title="Privacy policy"
      updated={UPDATED}
      intro="A short policy, because this site collects very little. Here is exactly what happens to the information you send us, and an equally precise account of what this site does not do."
      sections={SECTIONS}
      note={LAWYER_REVIEW_NOTE}
    />
  )
}
