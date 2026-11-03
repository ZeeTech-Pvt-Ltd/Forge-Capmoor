import { LegalPage } from '../components/LegalPage'
import { LAWYER_REVIEW_NOTE } from '../lib/legal'

const UPDATED = '3 November 2026'

/**
 * Privacy policy.
 *
 * Two things in here are load-bearing and must be kept true:
 *
 *   1. The account form collects a first name, a last name, an email address
 *      and a phone number. If a field is ever added, section 02 has to change
 *      in the same commit.
 *   2. Google Analytics is the only analytics or tracking on this site.
 *      Sections 02 and 09 describe what it processes. Adding another tracker
 *      means changing both sections and adding a cookie notice before the
 *      first cookie is set.
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
      'The account form collects only what you choose to send us: the first name you type, the last name you type, the email address you type, and the phone number you type.',
      'This site also uses Google Analytics, which records how pages are used and sends your IP address to Google as described in section 09. The country selector asks our own server for the country your connection appears to come from. Our hosting provider processes your IP address to deliver the site and return that country code; the site itself does not write your IP address into the form or into a profile. We do not track you across other websites.',
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
      'The site uses a hosting provider, a form-delivery service and Google Analytics. Google Analytics processes usage data and IP addresses as described in section 09. If any of those providers stores data outside Australia, that transfer is described in section 10.',
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
      'We use Google Analytics to understand how visitors use this site. Google Analytics is a service provided by Google that sets cookies in your browser and sends information about your visit, including your IP address, to Google. The data is used only to measure how the site is used, such as which pages are visited and how visitors reach them, and it is not combined with the details you submit through the account form.',
      'There is no advertising pixel, no session recorder and no social media embed on any page. If you prefer not to be measured by Google Analytics, you can block the cookies through your browser settings, or install Google’s Analytics Opt-out browser add-on.',
    ],
  },
  {
    heading: 'International transfers',
    paragraphs: [
      'This site is operated from Australia. Our hosting provider, the form-delivery service and Google Analytics may process information in other countries. Where that happens, your information is transferred as part of running the site, delivering an enquiry, or measuring how the site is used.',
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
