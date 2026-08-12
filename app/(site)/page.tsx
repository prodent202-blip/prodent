import { Hero } from '@/components/sections/hero'
import { AboutTeaser } from '@/components/sections/about-teaser'
import { CatalogTeaser } from '@/components/sections/catalog-teaser'
import { WhyChooseUs } from '@/components/sections/why-choose-us'
import { CtaSection } from '@/components/sections/cta-section'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <WhyChooseUs />
      <CatalogTeaser />
      <CtaSection />
    </>
  )
}
