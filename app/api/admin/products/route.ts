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
    .from('products')
    .select('*, category:categories(id, name, slug), catalog:catalogs(id, name, slug)')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name, description, catalog_id, category_id, image_url } = await request.json()
  if (!name?.trim() || !catalog_id || !category_id) {
    return NextResponse.json(
      { error: 'Name, catalog, and category are required' },
      { status: 400 },
    )
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('products')
    .insert({
      name: name.trim(),
      slug: slugify(name),
      description: description?.trim() || null,
      catalog_id,
      category_id,
      image_url: image_url || null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(request: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, name, description, catalog_id, category_id, image_url } = await request.json()
  if (!id || !name?.trim() || !catalog_id || !category_id) {
    return NextResponse.json(
      { error: 'ID, name, catalog, and category are required' },
      { status: 400 },
    )
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('products')
    .update({
      name: name.trim(),
      slug: slugify(name),
      description: description?.trim() || null,
      catalog_id,
      category_id,
      image_url: image_url || null,
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
  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
