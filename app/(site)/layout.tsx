import { Navbar } from '@/components/sections/navbar'
import { Footer } from '@/components/sections/footer'
import { ContactProvider } from '@/components/contact-provider'
import { safeGetContactInfo } from '@/lib/supabase/queries'

export const dynamic = 'force-dynamic'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const contact = await safeGetContactInfo()

  return (
    <ContactProvider contact={contact}>
      <Navbar />
      <main>{children}</main>
      <Footer contact={contact} />
    </ContactProvider>
  )
}
