import { Navbar } from '@/components/sections/navbar'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Catalog } from '@/components/sections/catalog'
import { WhyChooseUs } from '@/components/sections/why-choose-us'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Catalog />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
