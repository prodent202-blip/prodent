import { features } from '@/lib/site-config'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

export function WhyChooseUs() {
  return (
    <section id="why-us" className="scroll-mt-20 border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Trusted by dental professionals"
            description="We combine international sourcing with dependable local service — so your clinic is always well equipped."
          />
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal
              as="li"
              key={feature.title}
              delay={i * 90}
              className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <feature.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
