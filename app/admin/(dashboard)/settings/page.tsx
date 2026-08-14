'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { AdminField, adminInputClass, adminTextareaClass } from '@/components/admin/admin-field'
import {
  CONTACT_SETTING_KEYS,
  DEFAULT_CONTACT_INFO,
  type ContactInfo,
} from '@/lib/contact'
import { DEFAULT_MAP_EMBED_URL } from '@/lib/types/catalog'

type SiteSetting = {
  key: string
  value: string
}

function settingsToMap(settings: SiteSetting[]): Map<string, string> {
  return new Map(settings.map((setting) => [setting.key, setting.value]))
}

export default function AdminSettingsPage() {
  const [contact, setContact] = useState<ContactInfo>(DEFAULT_CONTACT_INFO)
  const [mapEmbedUrl, setMapEmbedUrl] = useState(DEFAULT_MAP_EMBED_URL)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [savingContact, setSavingContact] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [contactMessage, setContactMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data: SiteSetting[]) => {
        const settings = settingsToMap(data)

        setContact({
          email: settings.get(CONTACT_SETTING_KEYS.email) ?? DEFAULT_CONTACT_INFO.email,
          phone: settings.get(CONTACT_SETTING_KEYS.phone) ?? DEFAULT_CONTACT_INFO.phone,
          location: settings.get(CONTACT_SETTING_KEYS.location) ?? DEFAULT_CONTACT_INFO.location,
          whatsappNumber:
            settings.get(CONTACT_SETTING_KEYS.whatsappNumber) ??
            DEFAULT_CONTACT_INFO.whatsappNumber,
          whatsappMessage:
            settings.get(CONTACT_SETTING_KEYS.whatsappMessage) ??
            DEFAULT_CONTACT_INFO.whatsappMessage,
        })
        setMapEmbedUrl(settings.get('map_embed_url') ?? DEFAULT_MAP_EMBED_URL)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSavingContact(true)
    setContactMessage('')

    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        settings: [
          { key: CONTACT_SETTING_KEYS.email, value: contact.email },
          { key: CONTACT_SETTING_KEYS.phone, value: contact.phone },
          { key: CONTACT_SETTING_KEYS.location, value: contact.location },
          { key: CONTACT_SETTING_KEYS.whatsappNumber, value: contact.whatsappNumber },
          { key: CONTACT_SETTING_KEYS.whatsappMessage, value: contact.whatsappMessage },
          { key: 'map_embed_url', value: mapEmbedUrl },
        ],
      }),
    })

    setContactMessage(res.ok ? 'Contact settings saved.' : 'Failed to save contact settings.')
    setSavingContact(false)
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPasswordMessage('')

    if (newPassword !== confirmPassword) {
      setPasswordMessage('New passwords do not match.')
      return
    }

    if (newPassword.length < 8) {
      setPasswordMessage('New password must be at least 8 characters.')
      return
    }

    setSavingPassword(true)

    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    })

    if (res.ok) {
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setPasswordMessage('Password updated successfully.')
    } else {
      const data = await res.json().catch(() => ({}))
      setPasswordMessage(data.error ?? 'Failed to update password.')
    }

    setSavingPassword(false)
  }

  if (loading) {
    return <p className="text-muted-foreground">Loading...</p>
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage contact details shown on the public site and update your admin password.
        </p>
      </div>

      <form
        onSubmit={handleContactSubmit}
        className="max-w-2xl space-y-4 rounded-2xl border border-border bg-card p-6"
      >
        <h2 className="text-lg font-semibold text-foreground">Contact information</h2>

        <AdminField label="Email">
          <input
            type="email"
            value={contact.email}
            onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
            className={adminInputClass}
            required
          />
        </AdminField>

        <AdminField label="Phone">
          <input
            type="text"
            value={contact.phone}
            onChange={(e) => setContact((prev) => ({ ...prev, phone: e.target.value }))}
            className={adminInputClass}
            required
          />
        </AdminField>

        <AdminField label="Location">
          <input
            type="text"
            value={contact.location}
            onChange={(e) => setContact((prev) => ({ ...prev, location: e.target.value }))}
            className={adminInputClass}
            required
          />
        </AdminField>

        <AdminField label="WhatsApp number (digits only, no + or spaces)">
          <input
            type="text"
            value={contact.whatsappNumber}
            onChange={(e) =>
              setContact((prev) => ({ ...prev, whatsappNumber: e.target.value }))
            }
            className={adminInputClass}
            required
          />
        </AdminField>

        <AdminField label="Default WhatsApp message">
          <textarea
            value={contact.whatsappMessage}
            onChange={(e) =>
              setContact((prev) => ({ ...prev, whatsappMessage: e.target.value }))
            }
            className={adminTextareaClass}
            rows={3}
            required
          />
        </AdminField>

        <AdminField label="Map embed URL">
          <textarea
            value={mapEmbedUrl}
            onChange={(e) => setMapEmbedUrl(e.target.value)}
            className={adminTextareaClass}
            rows={4}
            required
          />
        </AdminField>

        <div className="overflow-hidden rounded-xl border border-border">
          <iframe
            title="Map preview"
            src={mapEmbedUrl}
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>

        {contactMessage ? <p className="text-sm text-muted-foreground">{contactMessage}</p> : null}

        <Button type="submit" disabled={savingContact}>
          {savingContact ? 'Saving...' : 'Save contact settings'}
        </Button>
      </form>

      <form
        onSubmit={handlePasswordSubmit}
        className="max-w-2xl space-y-4 rounded-2xl border border-border bg-card p-6"
      >
        <h2 className="text-lg font-semibold text-foreground">Change password</h2>
        <p className="text-sm text-muted-foreground">
          Use a strong password with at least 8 characters.
        </p>

        <AdminField label="Current password">
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={adminInputClass}
            autoComplete="current-password"
            required
          />
        </AdminField>

        <AdminField label="New password">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={adminInputClass}
            autoComplete="new-password"
            required
            minLength={8}
          />
        </AdminField>

        <AdminField label="Confirm new password">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={adminInputClass}
            autoComplete="new-password"
            required
            minLength={8}
          />
        </AdminField>

        {passwordMessage ? (
          <p className="text-sm text-muted-foreground">{passwordMessage}</p>
        ) : null}

        <Button type="submit" disabled={savingPassword}>
          {savingPassword ? 'Updating...' : 'Update password'}
        </Button>
      </form>
    </div>
  )
}
