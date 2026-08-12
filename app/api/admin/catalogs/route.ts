import { NextResponse } from 'next/server'
import { requireAdminSession } from '@/lib/auth/require-admin'
import { createAdminClient } from '@/lib/supabase/admin'
import { slugify } from '@/lib/slugify'

export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('catalogs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name, description } = await request.json()
  if (!name?.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const slug = slugify(name)

  const { data, error } = await supabase
    .from('catalogs')
    .insert({ name: name.trim(), slug, description: description?.trim() || null })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(request: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, name, description } = await request.json()
  if (!id || !name?.trim()) {
    return NextResponse.json({ error: 'ID and name are required' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('catalogs')
    .update({
      name: name.trim(),
      slug: slugify(name),
      description: description?.trim() || null,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(request: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await request.json()
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

  const supabase = createAdminClient()
  const { error } = await supabase.from('catalogs').delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
