import type { LucideIcon } from 'lucide-react'
import type { SVGProps } from 'react'
import {
  Stethoscope,
  Scissors,
  FlaskConical,
  Package,
  ShieldCheck,
  BadgeDollarSign,
  Truck,
  Layers,
} from 'lucide-react'
import { FacebookIcon, InstagramIcon, LinkedinIcon } from '@/components/icons/social-icons'

/** Any icon component that renders an SVG and accepts standard SVG props. */
export type IconComponent = (props: SVGProps<SVGSVGElement>) => React.ReactElement

/**
 * Single source of truth for all editable site content.
 * Update contact details, links, and catalog entries here — no layout code needed.
 */

export type NavLink = {
  label: string
  /** In-page anchor (e.g. "#about") or route path. */
  href: string
}

export type ProductCategory = {
  title: string
  description: string
  icon: LucideIcon
  /** Placeholder image slot — swap in a real photo path later. */
  image: string
  imageAlt: string
}

export type Feature = {
  title: string
  description: string
  icon: LucideIcon
}

export type SocialPlatform = 'facebook' | 'instagram' | 'linkedin'

export type SocialLink = {
  platform: SocialPlatform
  label: string
  href: string
  icon: IconComponent
}

export const siteConfig = {
  name: 'Prodent',
  legalName: 'Prodent Ltd',
  tagline: 'Quality Dental & Surgical Instruments, Imported from Pakistan, Trusted in Mauritius',
  description:
    'Prodent imports premium dental and surgical instruments and dental materials from Pakistan and distributes them to dentists, clinics, and surgical supply buyers across Mauritius.',

  contact: {
    // Replace with the real business email, phone, and WhatsApp number.
    email: 'contact@prodent.mu',
    phone: '+230 5XXX XXXX',
    // International format, digits only — used to build the wa.me link.
    whatsappNumber: '230XXXXXXXX',
    whatsappMessage: "Hello Prodent, I'd like to know more about your dental and surgical products.",
    location: 'Port Louis, Mauritius',
  },

  /** Placeholder path — drop the real PDF at /public/catalog.pdf to activate. */
  catalogPdf: '/catalog.pdf',
} as const

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const productCategories: ProductCategory[] = [
  {
    title: 'Dental Instruments',
    description:
      'Precision hand instruments for examination, restoration, and everyday clinical use.',
    icon: Stethoscope,
    image: '/images/category-dental-instruments.png',
    imageAlt: 'Set of stainless steel dental instruments arranged on a tray',
  },
  {
    title: 'Surgical Instruments',
    description:
      'Durable, sterilisable surgical tools engineered for reliability in the operating field.',
    icon: Scissors,
    image: '/images/category-surgical-instruments.png',
    imageAlt: 'Surgical instruments laid out for a procedure',
  },
  {
    title: 'Dental Materials',
    description:
      'Restorative and impression materials selected for consistent, professional results.',
    icon: FlaskConical,
    image: '/images/category-dental-materials.png',
    imageAlt: 'Dental restorative materials and containers',
  },
  {
    title: 'Consumables',
    description:
      'Gloves, gauze, disposables, and everyday clinic essentials kept reliably in stock.',
    icon: Package,
    image: '/images/category-consumables.png',
    imageAlt: 'Boxed dental consumables and disposable supplies',
  },
]

export const features: Feature[] = [
  {
    title: 'Genuine Quality',
    description:
      'Instruments and materials sourced from trusted manufacturers, held to medical-grade standards.',
    icon: ShieldCheck,
  },
  {
    title: 'Competitive Pricing',
    description:
      'Direct importing lets us pass fair, transparent pricing straight on to your practice.',
    icon: BadgeDollarSign,
  },
  {
    title: 'Reliable Local Distribution',
    description:
      'Stocked and shipped within Mauritius for fast, dependable delivery to your clinic.',
    icon: Truck,
  },
  {
    title: 'Wide Range of Products',
    description:
      'From hand instruments to consumables, a broad catalog to equip your whole practice.',
    icon: Layers,
  },
]

export const socialLinks: SocialLink[] = [
  {
    platform: 'facebook',
    label: 'Prodent on Facebook',
    href: 'https://facebook.com/your-page',
    icon: FacebookIcon,
  },
  {
    platform: 'instagram',
    label: 'Prodent on Instagram',
    href: 'https://instagram.com/your-handle',
    icon: InstagramIcon,
  },
  {
    platform: 'linkedin',
    label: 'Prodent on LinkedIn',
    href: 'https://linkedin.com/company/your-company',
    icon: LinkedinIcon,
  },
]

/** Builds the WhatsApp deep link from the config, encoding the prefilled message. */
export function getWhatsAppLink(): string {
  const { whatsappNumber, whatsappMessage } = siteConfig.contact
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
}
