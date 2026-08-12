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
    .from('categories')
    .select('*, catalog:catalogs(id, name, slug)')
    .order('name')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name, catalog_id } = await request.json()
  if (!name?.trim() || !catalog_id) {
    return NextResponse.json({ error: 'Name and catalog are required' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('categories')
    .insert({ name: name.trim(), slug: slugify(name), catalog_id })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(request: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, name, catalog_id } = await request.json()
  if (!id || !name?.trim() || !catalog_id) {
    return NextResponse.json({ error: 'ID, name, and catalog are required' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('categories')
    .update({ name: name.trim(), slug: slugify(name), catalog_id })
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
  const { error } = await supabase.from('categories').delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
