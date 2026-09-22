import { useBreakpoint } from '../hooks/useBreakpoint'
import { HERO_LAYOUTS } from '../lib/heroNetwork'
import { HeroHub } from './HeroHub'
import { NetworkSvg } from './NetworkSvg'

import './HeroBackdrop.css'

/**
 * The hero's network, drawn as the hero's own background layer.
 *
 * The hub sits against the hero box itself, so the composition is anchored to
 * the section rather than to a block below the copy.
 *
 * The chips are gone; the connectors are not. They used to terminate on the
 * edge of a labelled card, and with the cards removed they now fan out into
 * open space. That is the intended reading — the curves suggest a network
 * reaching past the frame rather than six lines that lost their endpoints —
 * and it is why the paths were deliberately left at the coordinates they had
 * rather than shortened. Retune them in lib/heroNetwork.js if the fan should
 * be even instead of where the cards used to sit.
 *
 * The chip data is still in lib/heroNetwork.js and the renderer is still in
 * HeroFloatingCard.jsx, unused — kept rather than deleted because the project
 * has no version control, so restoring them is one render call rather than a
 * rewrite. Being unreferenced, they cost nothing in the bundle.
 *
 * Nothing here is exposed to assistive tech — it is the same ideas the
 * Capabilities section states properly in text.
 */
export function HeroBackdrop() {
  const breakpoint = useBreakpoint()
  const layout = HERO_LAYOUTS[breakpoint]

  return (
    <div className="hero-backdrop" aria-hidden="true">
      <NetworkSvg
        // Remounting on a layout change replays the draw-in, which reads as
        // the composition rebuilding rather than the lines snapping.
        key={layout.name}
        layout={layout}
        idPrefix="net"
        className="hero-backdrop__svg"
      />

      <HeroHub hub={layout.hub} layout={layout} />
    </div>
  )
}

export default HeroBackdrop
