import { LegalPage } from '../components/LegalPage'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { LAWYER_REVIEW_NOTE } from '../lib/legal'

const UPDATED = '21 September 2026'

/**
 * Risk disclosure.
 *
 * The clause set follows the usual shape for this kind of notice, with one
 * addition: clause 07 covers client money and custody. A platform that holds
 * client funds and places trades has a specific risk to describe — that a
 * segregated account protects against one failure mode and not against the
 * market — and leaving it out would make the rest of the document read as
 * boilerplate rather than as an honest account of what can go wrong.
 */
const SECTIONS = [
  {
    heading: 'General risk statement',
    paragraphs: [
      'Trading and investing in financial markets carries significant risk and can result in the loss of part or all of your capital. Before you open an account you should consider whether trading suits your experience, your objectives and your financial circumstances.',
    ],
  },
  {
    heading: 'Market volatility',
    paragraphs: [
      'The prices of cryptocurrencies, foreign exchange, commodities, indices and other assets can move rapidly and unpredictably. Sudden movements can occur at any time, including outside the hours you would normally associate with a given market, and can produce losses larger than you anticipated.',
      'Where leverage is available it magnifies losses as readily as it magnifies gains, and it can move a position into loss faster than you are able to close it.',
    ],
  },
  {
    heading: 'No investment advice',
    paragraphs: [
      'Forge Capmoor provides trading technology and execution services. Nothing on this platform, including AI-generated analysis, signals, or any other content, is personal financial advice, a recommendation, or a solicitation to trade.',
      'Everything published here is general information. It does not take account of your objectives, your financial situation or your needs, and it should not be read as if it did.',
    ],
  },
  {
    heading: 'Limits of AI and automated tools',
    paragraphs: [
      'Automated analysis is built on historical and live data and on statistical models. Models can be wrong. They may not reflect conditions they have not seen before, they can produce confident output from poor inputs, and they do not guarantee an accurate prediction.',
      'An automated action is not a substitute for your own judgement. Automation is a setting you control, and switching it off does not restrict anything else about your account.',
    ],
  },
  {
    heading: 'Past performance and illustrative figures',
    paragraphs: [
      'Any past or simulated performance is not a reliable indicator of future results. Hypothetical and backtested results carry inherent limitations, including that they are produced with the benefit of hindsight, and they may overstate what would have been achievable in live markets.',
      'Where a figure appears on this site to illustrate an outcome, it is an example and nothing more. It is not a forecast, a target or a promise.',
    ],
  },
  {
    heading: 'Liquidity and execution',
    paragraphs: [
      'Market conditions affect the speed and the price at which orders are filled. Thin liquidity can produce slippage, wider spreads, and difficulty entering or exiting a position at the price you expected.',
      'An automated system is subject to the same conditions as any other participant. It cannot execute at a price the market is not offering, and it cannot protect you from a gap in the market.',
    ],
  },
  {
    heading: 'Client money and custody',
    paragraphs: [
      'Client money is held separately from Forge Capmoor’s own operating funds, in a designated account, and is not used to run the business. Holding client money and placing trades on a client’s behalf are regulated activities in Australia, and the licence and registration details that govern them are set out in the terms of use.',
      'Segregation addresses one specific risk: that the failure of the firm takes your balance with it. It does not protect you against market losses, which remain yours, and it does not guarantee the solvency of the institution holding the account.',
    ],
  },
  {
    heading: 'Technology and security risks',
    paragraphs: [
      'Online platforms are subject to outages, failures and security threats, including unauthorised access, phishing and other attacks. We apply the measures described on our about page, but no online system is completely immune, and you should assume some risk of this kind always remains.',
    ],
  },
  {
    heading: 'Regulatory differences between countries',
    paragraphs: [
      'The legal and regulatory treatment of trading platforms, and of digital assets in particular, differs between jurisdictions and continues to change. A change in law or regulation may affect the availability, the value, or the legality of an asset or a feature.',
      'It is your responsibility to satisfy yourself that your use of this platform is lawful where you live.',
    ],
  },
  {
    heading: 'Your responsibility',
    paragraphs: [
      'You are solely responsible for your own trading and investment decisions, and for verifying anything before you act on it. Never trade with money you cannot afford to lose.',
      'If you do not understand a product, or any risk described in this document, do not use it.',
    ],
  },
  {
    heading: 'Seek independent advice',
    paragraphs: [
      'Before using this platform, or engaging in any trading activity, consider seeking independent professional advice tailored to your own circumstances. We cannot give you that advice, and nothing on this site is a substitute for it.',
    ],
  },
]

export default function RiskDisclosure() {
  useDocumentMeta({
    title: 'Risk disclosure | Forge Capmoor',
    description:
      'What can go wrong when you trade: the risk of losing the capital you commit, the limits of automated analysis, and how client money is held.',
    path: '/risk-disclosure',
  })

  return (
    <LegalPage
      eyebrow="Legal"
      title="Risk disclosure"
      updated={UPDATED}
      intro="What can go wrong, written before you fund an account rather than after. If any of this is unclear, that is a reason to ask rather than a reason to proceed."
      sections={SECTIONS}
      numbered
      note={LAWYER_REVIEW_NOTE}
    />
  )
}
