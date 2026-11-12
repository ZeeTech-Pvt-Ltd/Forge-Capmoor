import { Hero } from '../components/Hero'
import { Principles } from '../components/Principles'
import { Proposition } from '../components/Proposition'
import { HowItWorks } from '../components/HowItWorks'
import { Capabilities } from '../components/Capabilities'
import { Technology } from '../components/Technology'
import { Toolkit } from '../components/Toolkit'
import { Benefits } from '../components/Benefits'
import { DataDomains } from '../components/DataDomains'
import { WhyForge } from '../components/WhyForge'
import { FaqTeaser } from '../components/FaqTeaser'
import { FinalCTA } from '../components/FinalCTA'

/**
 * Homepage.
 *
 * The order follows the supplied content document: hero, what it is, how the
 * signals work, highlights, why choose us, getting started, markets, features,
 * who it is for, security, FAQs, final CTA.
 *
 * The document's testimonial section is deliberately absent. It says to leave
 * that section hidden until real reviews are collected, so nothing is rendered.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Proposition />
      <HowItWorks />
      <Principles />
      <WhyForge />
      <Toolkit />
      <DataDomains />
      <Capabilities />
      <Benefits />
      <Technology />
      <FaqTeaser />
      <FinalCTA />
    </>
  )
}
