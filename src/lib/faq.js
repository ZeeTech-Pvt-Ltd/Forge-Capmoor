/**
 * FAQ content.
 *
 * The visible accordion and the FAQPage structured data both read from this
 * array, so the schema can never drift away from what a visitor actually
 * reads on the page — which is exactly the mismatch that gets rich results
 * penalised.
 *
 * Answers are plain strings on purpose, because they are serialised straight
 * into JSON-LD. That means no JSX and no placeholders in here: the regulatory
 * details that are still missing live in the legal pages, where a reader
 * expects to find them and where a placeholder is not a blemish on an
 * otherwise clean answer.
 *
 * Every answer is limited to what the product does. No performance figures,
 * no adoption numbers, no security certifications, no processing times.
 */
export const FAQ_ITEMS = [
  {
    question: 'What is Forge Capmoor?',
    answer:
      'Forge Capmoor is an AI-assisted trading platform. It reads live market data across several asset classes, and then either places trades automatically on your behalf or hands you the signal to act on yourself. Every automated action is recorded with the reasoning behind it.',
  },
  {
    question: 'Does Forge Capmoor trade on my behalf?',
    answer:
      'Yes, if you leave automation switched on. The system monitors the market continuously and executes when its conditions are met. You keep control of the account throughout, and you can place trades yourself at any time.',
  },
  {
    question: 'How do I open an account?',
    answer:
      'Fill in the form on the sign-up page with your name, email address and phone number. We will follow up to verify your details and walk you through funding the account and setting your automation preferences.',
  },
  {
    question: 'Can I turn automation off?',
    answer:
      'At any time, and without losing access to anything else. Automation is a setting on your account, not a condition of having one. When it is off the platform still analyses the market and still shows you the reasoning behind each signal. It simply waits for you to act.',
  },
  {
    question: 'Can I withdraw my money?',
    answer:
      'Yes. Withdrawals are returned through the same channel the funds arrived by. Requests are checked before they are released, which is standard practice and a requirement of anti-money-laundering rules, and you may be asked for additional identification before a first withdrawal.',
  },
  {
    question: 'Where is my money held?',
    answer:
      'Client money is held separately from Forge Capmoor’s own operating funds, in a designated account. We do not use it to run the business. The arrangements that govern client money, and the licence and registration details behind them, are set out in full in our terms of use.',
  },
  {
    question: 'How do I know what the system did, and why?',
    answer:
      'Every automated action appears in your account with its working attached: which inputs were read, which condition was met, and what the risk context looked like at the time. You can follow any action back to its source and disagree with it on the evidence.',
  },
  {
    question: 'How secure is my account?',
    answer:
      'Accounts can be protected with two-factor authentication, and data is encrypted in transit. Withdrawals require confirmation before they are released. No online system is immune to risk, so we would rather describe the measures than promise an absolute.',
  },
  {
    question: 'Do you give financial advice?',
    answer:
      'No. Forge Capmoor provides trading technology and execution. It does not provide personal financial advice, it does not consider your circumstances, and nothing on this site is a recommendation to buy or sell anything. Please read the risk disclosure before you fund an account.',
  },
  {
    question: 'How do I know I am on the real Forge Capmoor site?',
    answer:
      'Check the address bar: the only official domain is forge-capmoor.net. Lookalike sites are a common problem wherever a platform becomes well known, and they are built to capture login details. Bookmark the real domain and reach us through this site if anything looks wrong.',
  },
]

/** FAQPage JSON-LD, derived from the same array the accordion renders. */
export const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}
