import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'

import './Proposition.css'

/* One image, chosen because it shows the signal side of the product: a person
   with trade-call and verified-signal panels beside a price chart. */
const VISUAL = {
  src: '/home-1-960.webp',
  srcSet: '/home-1-640.webp 640w, /home-1-960.webp 960w, /home-1-1200.webp 1200w',
  alt: 'A person wearing a headset beside panels for trade calls, verified signals, risk analysis and real-time support.',
}

/**
 * Positioning section: what Forge Capmoor actually is.
 *
 * Layout stays asymmetric - the definition on the left, the four parts of an
 * alert illustrated on the right - so it does not repeat the centred rhythm
 * used by the highlights strip below.
 */
export function Proposition() {
  return (
    <section className="section proposition" aria-labelledby="proposition-title">
      <div className="container container--wide proposition__inner">
        <div className="proposition__text">
          <SectionHead
            align="start"
            eyebrow="What it is"
            id="proposition-title"
            title="What Is Forge Capmoor?"
            lead="Forge Capmoor is a trading signals provider that analyzes the crypto, forex, stock and commodity markets and sends members specific buy or sell recommendations, complete with an entry price, stop-loss, take-profit target and the reasoning behind each trade, so they can make informed decisions on their own terms."
          />

          <p className="proposition__body">
            Think of Forge Capmoor as a research desk in your pocket. Professional traders
            never risk money without careful analysis first. Forge Capmoor brings that same
            preparation to everyday traders and fits it into one short, easy-to-read alert.
          </p>
        </div>

        <Reveal className="proposition__visual" delay={120}>
          <img
            src={VISUAL.src}
            srcSet={VISUAL.srcSet}
            sizes="(max-width: 899px) 92vw, 44vw"
            alt={VISUAL.alt}
            width="960"
            height="960"
            loading="lazy"
            decoding="async"
          />
        </Reveal>
      </div>
    </section>
  )
}

export default Proposition
