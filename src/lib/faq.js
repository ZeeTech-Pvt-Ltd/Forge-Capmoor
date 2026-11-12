/**
 * FAQ content.
 *
 * The visible accordion and the FAQPage structured data both read from this
 * array, so the schema can never drift away from what a visitor actually
 * reads on the page.
 *
 * The questions and answers come from the supplied content document. The two
 * placeholders in it were filled with the operator's values: a $250 minimum
 * deposit and a 1 to 3 working day withdrawal time.
 */
export const FAQ_ITEMS = [
  {
    question: 'What is Forge Capmoor?',
    answer:
      'Forge Capmoor is a trading signals provider that researches the markets and sends you clear trade alerts with entry, stop-loss and take-profit levels.',
  },
  {
    question: 'What makes a Forge Capmoor signal useful?',
    answer:
      'Each one comes with a complete trade plan and a short reason, so you know exactly what you are getting into.',
  },
  {
    question: 'Is Forge Capmoor suitable for beginners?',
    answer:
      'Absolutely. Alerts are written in everyday language, and each one teaches you a little more about how markets move.',
  },
  {
    question: 'Does Forge Capmoor control my trades?',
    answer: 'No. You stay in charge and decide whether to act on every signal.',
  },
  {
    question: 'What can I trade with Forge Capmoor?',
    answer: 'Crypto, forex, stocks and commodities, all through one account.',
  },
  {
    question: 'Do I need special software?',
    answer: 'No. Forge Capmoor runs in any web browser on your phone, tablet or computer.',
  },
  {
    question: 'How much do I need to begin?',
    answer: 'The minimum deposit is $250.',
  },
  {
    question: 'When will I receive my withdrawal?',
    answer: 'Withdrawals are processed within 1 to 3 working days.',
  },
  {
    question: 'Could I lose money?',
    answer: 'Yes. All trading carries risk, so only use money you can afford to lose.',
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
