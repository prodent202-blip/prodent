import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import { AdminNav } from '@/components/admin/admin-nav'
import { AdminLogoutButton } from '@/components/admin/admin-logout-button'

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-lg font-bold text-foreground">
              {siteConfig.name} Admin
            </Link>
            <AdminNav />
          </div>
          <AdminLogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  )
}
