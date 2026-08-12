import Link from 'next/link'
import { BookOpen, FolderOpen, Package, Settings } from 'lucide-react'

const cards = [
  {
    href: '/admin/catalogs',
    title: 'Catalogs',
    description: 'Create and manage product catalogs',
    icon: BookOpen,
  },
  {
    href: '/admin/categories',
    title: 'Categories',
    description: 'Organize products into categories',
    icon: FolderOpen,
  },
  {
    href: '/admin/products',
    title: 'Products',
    description: 'Add products with images and descriptions',
    icon: Package,
  },
  {
    href: '/admin/settings',
    title: 'Settings',
    description: 'Update map embed URL and site settings',
    icon: Settings,
  },
]

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Manage your product catalog, categories, and site settings.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <li key={card.href}>
            <Link
              href={card.href}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <card.icon className="size-5" />
              </span>
              <div>
                <h2 className="font-semibold text-foreground">{card.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{card.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
