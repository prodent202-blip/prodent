import type { LucideIcon } from 'lucide-react'
import type { SVGProps } from 'react'
import {
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
  href: string
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
    email: 'prodent202@gmail.com',
    phone: '+230 5508 0607',
    whatsappNumber: '23055080607',
    whatsappMessage: "Hello Prodent, I'd like to know more about your dental and surgical products.",
    location: 'Grand Baie, Mauritius',
  },
} as const

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
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

/** Builds the WhatsApp deep link, optionally with a custom prefilled message. */
export function getWhatsAppLink(message?: string): string {
  const { whatsappNumber, whatsappMessage } = siteConfig.contact
  const text = message ?? whatsappMessage
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
}

/** Prefilled WhatsApp message for a product enquiry. */
export function getProductWhatsAppLink(productName: string): string {
  return getWhatsAppLink(`Hello Prodent, I'd like to enquire about: ${productName}`)
}
