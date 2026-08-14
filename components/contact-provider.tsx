'use client'

import { createContext, useContext } from 'react'
import { DEFAULT_CONTACT_INFO, type ContactInfo } from '@/lib/contact'

const ContactContext = createContext<ContactInfo>(DEFAULT_CONTACT_INFO)

export function ContactProvider({
  contact,
  children,
}: {
  contact: ContactInfo
  children: React.ReactNode
}) {
  return <ContactContext.Provider value={contact}>{children}</ContactContext.Provider>
}

export function useContact(): ContactInfo {
  return useContext(ContactContext)
}
