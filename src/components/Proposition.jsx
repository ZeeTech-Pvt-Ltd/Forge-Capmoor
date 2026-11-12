import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'

import './Proposition.css'

/* The images already in /public, used as the visual for the four parts named in
   the definition. The alt text describes the photograph itself. */
const GALLERY = [
  {
    src: '/home-1-960.webp',
    srcSet: '/home-1-640.webp 640w, /home-1-960.webp 960w, /home-1-1200.webp 1200w',
    alt: 'A person wearing a headset beside panels for trade calls, verified signals, risk analysis and real-time support.',
  },
  {
    src: '/home-2-960.webp',
    srcSet: '/home-2-640.webp 640w, /home-2-960.webp 960w, /home-2-1200.webp 1200w',
    alt: 'A person at a laptop beside panels stepping through analyze, evaluate and decide.',
  },
  {
    src: '/home-3-960.webp',
    srcSet: '/home-3-640.webp 640w, /home-3-960.webp 960w, /home-3-1200.webp 1200w',
    alt: 'A person at a trading desk facing several monitors showing live trading and market analysis.',
  },
  {
    src: '/about-2-960.webp',
    srcSet: '/about-2-640.webp 640w, /about-2-960.webp 960w, /about-2-1200.webp 1200w',
    alt: 'A person holding a tablet beside a market chart on the screen.',
  },
]

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

        <div
          className="proposition__gallery"
          role="group"
          aria-label="Trade research and alerts at Forge Capmoor"
        >
          {GALLERY.map((item, index) => (
            <Reveal
              key={item.src}
              delay={index * 90}
              className="proposition__shot"
            >
              <img
                src={item.src}
                srcSet={item.srcSet}
                sizes="(max-width: 899px) 45vw, 22vw"
                alt={item.alt}
                width="960"
                height="960"
                loading="lazy"
                decoding="async"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Proposition
