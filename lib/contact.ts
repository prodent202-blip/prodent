export type ContactInfo = {
  email: string
  phone: string
  location: string
  whatsappNumber: string
  whatsappMessage: string
}

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  email: 'prodent202@gmail.com',
  phone: '+230 5508 0607',
  location: 'Grand Baie, Mauritius',
  whatsappNumber: '23055080607',
  whatsappMessage:
    "Hello Prodent, I'd like to know more about your dental and surgical products.",
}

export const CONTACT_SETTING_KEYS = {
  email: 'contact_email',
  phone: 'contact_phone',
  location: 'contact_location',
  whatsappNumber: 'whatsapp_number',
  whatsappMessage: 'whatsapp_message',
} as const

export function buildWhatsAppLink(
  contact: ContactInfo,
  message?: string,
): string {
  const text = message ?? contact.whatsappMessage
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`
}

export function buildProductWhatsAppLink(
  contact: ContactInfo,
  productName: string,
): string {
  return buildWhatsAppLink(
    contact,
    `Hello Prodent, I'd like to enquire about: ${productName}`,
  )
}
