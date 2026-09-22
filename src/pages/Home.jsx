import { Hero } from '../components/Hero'
import { Principles } from '../components/Principles'
import { Proposition } from '../components/Proposition'
import { HowItWorks } from '../components/HowItWorks'
import { Capabilities } from '../components/Capabilities'
import { Technology } from '../components/Technology'
import { Security } from '../components/Security'
import { Toolkit } from '../components/Toolkit'
import { Benefits } from '../components/Benefits'
import { DataDomains } from '../components/DataDomains'
import { WhyForge } from '../components/WhyForge'
import { FaqTeaser } from '../components/FaqTeaser'
import { FinalCTA } from '../components/FinalCTA'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

/**
 * Homepage.
 *
 * Section order is arranged so the page alternates rhythm rather than
 * repeating a pattern: centred block, split block, horizontal rail, bento
 * grid, dark band, alternating rows, tile grid, sticky two-column, accordion,
 * closing band. No two adjacent sections share a layout.
 */
export default function Home() {
  useDocumentMeta({
    title: 'Forge Capmoor | AI Trading Platform That Explains Itself',
    description:
      'An AI-assisted trading platform that reads live market data, acts when its conditions are met, and explains the reasoning behind every action.',
    path: '/',
  })

  return (
    <>
      <Hero />
      <Principles />
      <Proposition />
      <HowItWorks />
      <Capabilities />
      <Technology />
      <Security />
      <Toolkit />
      <Benefits />
      <DataDomains />
      <WhyForge />
      <FaqTeaser />
      <FinalCTA />
    </>
  )
}
