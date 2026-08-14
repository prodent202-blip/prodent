import { NextResponse } from 'next/server'
import { requireAdminSession } from '@/lib/auth/require-admin'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase.from('site_settings').select('*')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

type SettingsPayload =
  | { key: string; value: string }
  | { settings: Array<{ key: string; value: string }> }

export async function PUT(request: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json()) as SettingsPayload
  const supabase = createAdminClient()

  if ('settings' in body && Array.isArray(body.settings)) {
    const rows = body.settings
      .filter((item) => item.key?.trim() && item.value !== undefined)
      .map((item) => ({ key: item.key.trim(), value: String(item.value) }))

    if (rows.length === 0) {
      return NextResponse.json({ error: 'No valid settings provided' }, { status: 400 })
    }

    const { data, error } = await supabase.from('site_settings').upsert(rows).select()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  }

  const { key, value } = body as { key?: string; value?: string }
  if (!key?.trim() || value === undefined) {
    return NextResponse.json({ error: 'Key and value are required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('site_settings')
    .upsert({ key: key.trim(), value: String(value) })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
