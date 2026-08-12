import type { Catalog, Category, Product } from '@/lib/types/catalog'
import { createClient } from '@/lib/supabase/server'

export async function getCatalogs(): Promise<Catalog[]> {
  const supabase = await createClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('catalogs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getCatalogBySlug(slug: string): Promise<Catalog | null> {
  const supabase = await createClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('catalogs')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function getCategoriesByCatalogId(catalogId: string): Promise<Category[]> {
  const supabase = await createClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('catalog_id', catalogId)
    .order('name')

  if (error) throw error
  return data ?? []
}

export async function getCategoryBySlug(
  catalogId: string,
  slug: string,
): Promise<Category | null> {
  const supabase = await createClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('catalog_id', catalogId)
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function getProductsByCategoryId(categoryId: string): Promise<Product[]> {
  const supabase = await createClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .order('name')

  if (error) throw error
  return data ?? []
}

export async function getSiteSetting(key: string): Promise<string | null> {
  const supabase = await createClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .maybeSingle()

  if (error) throw error
  return data?.value ?? null
}

export async function safeGetCatalogs(): Promise<Catalog[]> {
  try {
    return await getCatalogs()
  } catch {
    return []
  }
}

export async function safeGetSiteSetting(key: string, fallback: string): Promise<string> {
  try {
    const value = await getSiteSetting(key)
    return value ?? fallback
  } catch {
    return fallback
  }
}
